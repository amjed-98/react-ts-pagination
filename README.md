# react-ts-pagination

[![NPM](https://nodei.co/npm/react-ts-pagination.png?downloads=true)](https://www.npmjs.com/package/react-ts-pagination)

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mui/material-ui/blob/HEAD/LICENSE)

**A React.ts Component to render pagination in a simple and Declarative way.**

By installing the package you'll have this default pagination look, but you can easilly overwrite it using your own classes and styles.

<img src="https://i.imgur.com/ru9GoMQ.png" alt="Pagination demo 2" />

#### Note: if you want to have the default styles, you must import the styles file `"import 'react-ts-pagination/styles.css'"`. else you'll have to style everything using your own classes or style.

## why react-ts-pagination

- This package supports Typescript out of the box, so no need for `npm install @types/react-ts-pagination .`
- Exposes two hooks`usePagination`, `useServerPagination` that take cares of all the boilerplate for handling pagination states all in one line.
- Heavily tested for all possible edge cases and immune to future errors, so releasing a broken version of this package is highly unlikely.
- Strongly typed using advanced typescript to narrow down your types and avoid passing the wrong prop or parameter type, which gives you nice auto-completion.

## Installation

Install `react-ts-pagination `

with [npm](https://www.npmjs.com/):

```sh
npm install react-ts-pagination

```

with [yarn](https://yarnpkg.com/):

```sh
yarn add react-ts-pagination

```

## Usage

- ### With usePagination Hook:

```jsx
import { Pagination, usePagination } from 'react-ts-pagination';
import 'react-ts-pagination/styles.css';

function App() {
  const { currentPageNumber, pageItems, numberOfPages, handlePageChange } = usePagination({
    items,
    itemsPerPage: 8,
  });

  return (
    <div className='App'>
      <Table>
        {pageItems.map((page) => (
          <tr key={page.id}>
            <td>{page.id}</td>
            <td>{page.first_name}</td>
            <td>{page.last_name}</td>
            <td>{page.email}</td>
            <td>{page.phone}</td>
          </tr>
        ))}
      </Table>

      <Pagination
        currentPageNumber={currentPageNumber}
        numberOfPages={numberOfPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
```

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/crimson-cherry-5emhj9?file=%2Fsrc%2FApp.tsx&selection=%5B%7B%22endColumn%22%3A1%2C%22endLineNumber%22%3A9%2C%22startColumn%22%3A1%2C%22startLineNumber%22%3A9%7D%5D)

---

<br/>

- ### With useServerPagination Hook:
  **_Note:_ this hook is only used when your Api supports server pagination.**

```jsx
import { Pagination, useServerPagination } from 'react-ts-pagination';
import 'react-ts-pagination/styles.css';

function App() {
  const {
    pageItems,
    isLoading,
    currentPageNumber,
    handlePageChange
  } = useServerPagination<Repo[]>({
    url: 'https://api.github.com/orgs/GSG-G11/repos',
    searchParams: { page: 'page', perPage: 'per_page' },
    itemsPerPage: 5,
    numberOfPages: 12,
  });


  return (
       <div className='App'>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Table tableHeaders={tableHeaders}>
          {pageItems?.map(({ id, name, description, owner, visibility }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{owner.login}</td>
              <td>{description?.slice(0, 20)}</td>
              <td>{visibility}</td>
            </tr>
          ))}
        </Table>
      )}

      <Pagination
          currentPageNumber={currentPageNumber}
          numberOfPages={numberOfPages}
          onPageChange={handlePageChange}
        />
    </div>
  );
}
```

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/kind-payne-q4qhdh?file=%2Fsrc%2FApp.tsx&selection=%5B%7B%22endColumn%22%3A1%2C%22endLineNumber%22%3A24%2C%22startColumn%22%3A1%2C%22startLineNumber%22%3A24%7D%5D)

---

<br/>

- ### Passing your own custom props:

```jsx
import { Pagination } from 'react-ts-pagination';
import 'react-ts-pagination/styles.css';

const ITEMS_PER_PAGE = 10;
const numberOfPages = Math.ceil(items.length / ITEMS_PER_PAGE);

function App() {
  const [pageItems, setPageItems] = useState < typeof items > [];
  const currentPageNumber = useRef(1);

  const handlePageChange = (pageNumber: number, pageRef: HTMLSpanElement | undefined) => {
    const FIRST_PAGE_NUMBER = 1;
    const LAST_PAGE_NUMBER = numberOfPages;

    const isFirstPage = pageNumber + 1 === FIRST_PAGE_NUMBER;
    const isLastPage = pageNumber - 1 === LAST_PAGE_NUMBER;

    if (isLastPage || isFirstPage) return;

    const start = (pageNumber - 1) * ITEMS_PER_PAGE;
    const end = pageNumber * ITEMS_PER_PAGE;

    currentPageNumber.current = pageNumber;
    setPageItems(items.slice(start, end));
  };

  useEffect(() => {
    const start = (currentPageNumber.current - 1) * ITEMS_PER_PAGE;
    const end = currentPageNumber.current * ITEMS_PER_PAGE;
    setPageItems(items.slice(start, end));
  }, []);

  return (
    <div className='App'>
      <Table>
        {pageItems.map((page) => (
          <tr key={page.id}>
            <td>{page.id}</td>
            <td>{page.first_name}</td>
            <td>{page.last_name}</td>
            <td>{page.email}</td>
            <td>{page.phone}</td>
          </tr>
        ))}
      </Table>

      <Pagination
        currentPageNumber={currentPageNumber.current}
        numberOfPages={numberOfPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
```

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/condescending-tristan-p6pouc?file=%2Fsrc%2FApp.tsx&selection=%5B%7B%22endColumn%22%3A18%2C%22endLineNumber%22%3A44%2C%22startColumn%22%3A18%2C%22startLineNumber%22%3A44%7D%5D)

<br/>

## How to use?

> ## usePagination hook:

### Parameters: a single object Parameter with these props:

| Name                | Type     | Description                                                                    |
| ------------------- | -------- | ------------------------------------------------------------------------------ |
| `items`             | `Array`  | **Required:** The Array that you want the paginate on.                         |
| `initialPageNumber` | `Number` | **Optional:** The initial page selected. <br/> Default is 1                    |
| `ItemsPerPage`      | `Number` | **Optional:** the number of items to display on each page. <br/> Default is 10 |

### Returns: an Object with these props:

| Name                | Type      | Description                                                                                                 |
| ------------------- | --------- | ----------------------------------------------------------------------------------------------------------- |
| `pageItems`         | `Array`   | The current items state, for the current page number selected                                               |
| `currentPageNumber` | `Number`  | The page number state                                                                                       |
| `numberOfPages`     | `Number`  | The computed number of total pages that should be rendered, depending on the passed items array length      |
| `handlePageChange`  | `Funtion` | the handler function to handle changing pages, it expects pageNumber and pageRef to be passed as parameters |

<br/>
<br/>

> ## useServerPagination hook:

### Parameters: a single object Parameter with these props:

| Name                | Type     | Description                                                                                                                                                                                                                                                |
| ------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`               | `string` | **Required:** The endpoint for your Api (without the search quries).                                                                                                                                                                                       |
| `searchParams`      | `Object` | **Required:** an object that contains The search queries for your Api. <br/> **page**: a string that tells the server which page number you want to retrieve. <br/> **perPage**: a string that tells the server how many items to retrieve for each page}` |
| `initialPageNumber` | `Number` | **Optional:** The initial page selected. <br/> Default is 1                                                                                                                                                                                                |
| `ItemsPerPage`      | `Number` | **Required:** The number of items to display on each page. <br/> Default is 10                                                                                                                                                                             |

### Returns: an Object with these props:

| Name                | Type      | Description                                                                                                 |
| ------------------- | --------- | ----------------------------------------------------------------------------------------------------------- |
| `isLoading`         | `Boolean` | A boolean that presents the state of of the request                                                         |
| `isError`           | `Boolean` | A boolean that indicates if error accured or not while fetching the page                                    |
| `error`             | `object`  | A standard error object that changes for each page request                                                  |
| `currentPageNumber` | `Number`  | The page number state                                                                                       |
| `handlePageChange`  | `Funtion` | the handler function to handle changing pages, it expects pageNumber and pageRef to be passed as parameters |

<br/>
<br/>

> ## Pagination Component:

### Props:

| Name                       | Type                                | Description                                                                                                                                                        |
| -------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `currentPageNumber`        | `Number`                            | **Required:** The current page number state. <br/> You can either get it from usePagination hook or you can pass you own currentPageNumber state.                  |
| `numberOfPages`            | `Number`                            | **Required:** The number of total pages that should be generated. <br/> You can either get it from usePagination hook or you can pass you own numberOfPages state. |
| `onPageChange`             | `Function: (page,pageRef)=>{}`      | **Required:** the handler function to handle changing pages, it gets passed the currentPageNumber and the the dom reference for current page.                      |
| `nextLabel`                | `String or Refrence to A Component` | **Optional:** The next button text label. <br/> Default is : `❯`                                                                                                   |
| `nextBtnClass`             | `String`                            | **Optional:** A class name to apply to the next button. <br/> Default is `btn`                                                                                     |
| `prevLabel `               | `String or Refrence to A Component` | **Optional:** The prev button text label. <br/> Default is : `❮`                                                                                                   |
| `prevBtnClass`             | `String`                            | **Optional:** A class name to apply to the prev button. <br/> Default is `btn`                                                                                     |
| `pageStyle`                | `Object`                            | **Optional:** The defualt page style object with color and backgroundColor properties. <br/> Default is:`undefined`                                                |
| `activePageSyle`           | `Object`                            | **Optional:** The acitve page style object with color and background propeties. <br/> Default is `undefined`                                                       |
| `pageClass`                | `String`                            | **Optional:** A class name to apply to each page. <br/> The default class is `page`                                                                                |
| `activePageClass`          | `String`                            | **Optional:** A class name to to apply to the current acitve page or the page that being hovered. <br/> Default is `active-page`                                   |
| `paginationContainerClass` | `String`                            | **Optional:** A class name to apply to the parent container for the whole component. <br/> Default is `pagination`                                                 |
| `pagesContianerClass`      | `String`                            | **Optional:** A class name to apply to the direct parent of the pages. <br/> Default is `pages`                                                                    |

## Demo

To run the demo locally, clone the repository and move into it:

```sh
git clone git@github.com:amjed-98/react-ts-pagination.git
cd react-ts-pagination

```

Install dependencies:

```sh
npm install | yarn
```

preview the Demo

```sh
npm run demo | yarn demo
```

Open your browser and go to [http://127.0.0.1:5173/src/demo/index.html](http://127.0.0.1:5173/src/demo/index.html)

<img src="https://i.imgur.com/hu97NWG.gif" alt="Pagination demo" />

<br/>
<br/>

Run the tests

```sh
npm run test | yarn test
```

Run the tests in the browser with nice UI presentation

```sh
npm run test:ui | yarn test:ui
```
