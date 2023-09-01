# react-ts-pagination

[![NPM](https://nodei.co/npm/react-ts-pagination.png?downloads=true)](https://www.npmjs.com/package/react-ts-pagination)

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mui/material-ui/blob/HEAD/LICENSE)

<a href="https://www.buymeacoffee.com/amjadYahia" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

**A React Component to render pagination in a simple and Declarative way.**

By installing the package you'll have this default pagination look, but you can easilly overwrite it using your own classes and styles.

<img src="https://i.imgur.com/ru9GoMQ.png" alt="Pagination demo 2" />

#### Note: if you want to have the default styles, you must import the styles file `"import 'react-ts-pagination/styles.css'"`, else you'll have to style everything using your own classes or style.

## why react-ts-pagination

- Supports Typescript out of the box, so you can forget about` npm install @types/react-ts-pagination .`
- Supports client-side pagination using `usePagination` hook.
- Supports server-side pagination using `useServerPagination` hook.
- Heavily tested using unit tests for all possible edge cases and is immune to future errors, so releasing a broken version of this package is highly unlikely.
- highly flexible with the right amount of abstraction so you can use the package without the hooks and provide your own props and styles.
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
  **_Note:_ because this hook uses react query under the hood you must wrap you component with the provider to use this hook.**

```jsx
import { Pagination, useServerPagination, Provider } from 'react-ts-pagination';
import 'react-ts-pagination/styles.css';

function App() {

 const fetchData = async (page: number) => {
    const data = await (await fetch(`https://api.github.com/orgs/GSG-G11/repos?page=${page}&per_page=10`)).json();
    return data;
  };

  const { pageItems, isFetching, currentPageNumber, handlePageChange } = useServerPagination<Repo[]>({
    queryFunction: fetchData,
  });

  return (
       <div className='App'>
      {isFetching ? (
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

export default () => (
  <Provider>
    <App />
  </Provider>
);
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
  const [pageItems, setPageItems] = useState<typeof items>[];
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

| Name                | Type     | Description                                                                        |
| ------------------- | -------- | ---------------------------------------------------------------------------------- |
| `items`             | `Array`  | **Required:** The Array that you want the paginate on.                             |
| `initialPageNumber` | `Number` | **Optional:** The initial page selected. <br/> Default is **1**                    |
| `ItemsPerPage`      | `Number` | **Optional:** the number of items to display on each page. <br/> Default is **10** |

### Returns: an Object with these props:

| Name                | Type                                                     | Description                                                                                                                |
| ------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `pageItems`         | `Array`                                                  | The current items state, for the current page number selected                                                              |
| `currentPageNumber` | `Number`                                                 | The page number state                                                                                                      |
| `numberOfPages`     | `Number`                                                 | The computed number of total pages that should be rendered, depending on the passed items array length                     |
| `handlePageChange`  | `Funtion: (pageNumber:number, pageRef:RefObject)=> void` | the handler function to handle changing pages, it expects pageNumber and the page dom Reference to be passed as parameters |

<br/>
<br/>

> ## useServerPagination hook:

### Parameters: a single object Parameter with these props:

| Name                | Type       | Description                                                                                                                 |
| ------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| `queryFunction`     | `Function` | **Required:** The function that the query will use to request data, it expects the page number to be passed as a parameter. |
| `initialPageNumber` | `Number`   | **Optional:** The initial page selected. <br/> Default is **1**                                                             |
| `cacheTime`         | `number`   | **Optional:** The time in **milliseconds** after data is considered stale <br/> Default is **10_000**
<br/>

### Returns: an Object with these props:

| Name                | Type       | Description                                                                                                 |
| ------------------- | ---------- | ----------------------------------------------------------------------------------------------------------- |
| `isFetching`        | `Boolean`  | A boolean that presents the state of of the request                                                         |
| `status`            | `string`   | A string that presents the state of of the request(loading                                                  | success | error) |
| `isError`           | `Boolean`  | A boolean that indicates if error occurred or not while fetching the page.                                  |
| `error`             | `object`   | A standard error object if an error occurred while fetching pages.                                           |
| `currentPageNumber` | `Number`   | The page number state                                                                                       |
| `handlePageChange`  | `Function` | the handler function to handle changing pages, it expects pageNumber and pageRef to be passed as parameters |

<br/>
<br/>

> ## Pagination Component:

### Props:

| Name                       | Type                                                | Description                                                                                                                                                            |
| -------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currentPageNumber`        | `Number`                                            | **Required:** The current page number state. <br/> You can either get it from usePagination hook or you can pass you own currentPageNumber state.                      |
| `numberOfPages`            | `Number`                                            | **Required:** The number of total pages that should be generated. <br/> You can either get it from usePagination hook or you can pass you own numberOfPages state.     |
| `onPageChange`             | `Function: (page,pageRef)=>{}`                      | **Required:** the handler function to handle changing pages, it gets passed the currentPageNumber and the the dom reference for current page.                          |
| `nextLabel`                | `String or Refrence to A Component`                 | **Optional:** The next button text label. <br/> Default is : `❯`                                                                                                       |
| `nextBtnClass`             | `String`                                            | **Optional:** A class name to apply to the next button. <br/> Default is `btn`                                                                                         |
| `prevLabel `               | `String or Refrence to A Component`                 | **Optional:** The prev button text label. <br/> Default is : `❮`                                                                                                       |
| `prevBtnClass`             | `String`                                            | **Optional:** A class name to apply to the prev button. <br/> Default is `btn`                                                                                         |
| `pageStyle`                | `Object`                                            | **Optional:** An standard inline style object to style pages. <br/> Default is:`{}`                                                                                    |
| `activePageSyle`           | `Object`                                            | **Optional:** An standard inline style object to style current active page. <br/> Default is:`{}`                                                                      |
| `pageClass`                | `String`                                            | **Optional:** A class name to apply to each page. <br/> The default class is `page`                                                                                    |
| `activePageClass`          | `String`                                            | **Optional:** A class name to to apply to the current acitve page or the page that being hovered. <br/> Default is `active-page`                                       |
| `paginationContainerClass` | `String`                                            | **Optional:** A class name to apply to the parent container for the whole component. <br/> Default is `pagination`                                                     |
| `pagesContianerClass`      | `String`                                            | **Optional:** A class name to apply to the direct parent of the pages. <br/> Default is `pages`                                                                        |
| `buildPageText`            | `Funciton: (pageNumber:number) => number \| string` | **Optional:** A function that will be called inside each page element to render the inner text for that page element. <br/> Default is: `(pageNumber) => pageNumber` ` |

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
