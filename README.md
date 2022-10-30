# ts-react-pagination

[![NPM](https://nodei.co/npm/ts-react-pagination.png?downloads=true)](https://www.npmjs.com/package/ts-react-pagination)

**A React.ts Component to render pagination in a simple and Declarative way.**

By installing the package you'll have this default pagination look, but you can easilly overwrite it using your own classes and styles.

<img src="https://i.imgur.com/ru9GoMQ.png" alt="Pagination demo 2" />

## why ts-react-pagination

- This package supports Typescript out of the box, so no need for `npm install @types/ts-react-pagination.`
- Exposes a hook called `usePagination` that take cares of all the boilerplate for handling pagination states all in one line.
- Heavlly tested for all possible edge cases and prone to future error, so releasing a broken version of this package is highlly unlikely.
- Strongly typed using advanced typescript to narrow down your types and avoid passing wrong prop or parameter type, which gives you nice auto-completion.

## Installation

Install `ts-react-pagination`

with [npm](https://www.npmjs.com/):

```
npm install ts-react-pagination
```

with [yarn](https://yarnpkg.com/):

```
yarn add ts-react-pagination

```

## Usage

There are two ways to use this package:

#### 1- The first and recommended way is by using the `usePagination` hook with the Paginaiton component like this:

```typescript=
import { Pagination, usePagination } from 'ts-react-pagination';
import 'ts-react-pagination/styles.css';

function App() {

  const {
         currentPageNumber, numberOfPages, pageItems
    } = usePagination({ items });

  return (
    <div className='App'>
      <Table pageItems={pageItems} />

      <Pagination
        currentPageNumber={currentPageNumber}
        numberOfPages={numberOfPages}
      />
    </div>
  );
}
```

#### Note: if you want to have the default styles, you must import the styles file like in line 2. else you'll have to style everything using your own classes or style.

Full example on [SandBox](https://codesandbox.io/p/sandbox/crimson-cherry-5emhj9?file=%2Fsrc%2FApp.tsx&selection=%5B%7B%22endColumn%22%3A1%2C%22endLineNumber%22%3A9%2C%22startColumn%22%3A1%2C%22startLineNumber%22%3A9%7D%5D).

#### 2: The second way is how every other pagination library does, by letting you do all the heavy lefting of managing all states and logic like this:

```typescript=
import { Pagination } from "ts-react-pagination";
import "ts-react-pagination/styles.css";

const ITEMS_PER_PAGE = 10;
const numberOfPages = Math.ceil(items.length / ITEMS_PER_PAGE);

function App() {
  const [pageItems, setPageItems] = useState<typeof items>([]);
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
    <div className="App">
      <Table pageItems={pageItems} />

      <Pagination
        currentPageNumber={currentPageNumber.current}
        numberOfPages={numberOfPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
```

Full example on [SandBox](https://codesandbox.io/p/sandbox/condescending-tristan-p6pouc?file=%2Fsrc%2FApp.tsx&selection=%5B%7B%22endColumn%22%3A18%2C%22endLineNumber%22%3A44%2C%22startColumn%22%3A18%2C%22startLineNumber%22%3A44%7D%5D).

#### usePagination hook:

## Parameters: an single object Parameter with these props:

| Name                | Type     | Description                                                                    |
| ------------------- | -------- | ------------------------------------------------------------------------------ |
| `items`             | `Array`  | **Required:** The Array that you want the paginate on.                         |
| `initialPageNumber` | `Number` | **Optional:** The initial page selected. <br/> Default is 1                    |
| `ItemsPerPage`      | `Number` | **Optional:** the number of items to display on each page. <br/> Default is 10 |

## Returns an Object with these props:

| Name                | Type     | Description                                                                                            |
| ------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| `pageItems`         | `Array`  | The current items state, for the current page number selected                                          |
| `currentPageNumber` | `Number` | The page number state                                                                                  |
| `numberOfPages`     | `Number` | The computed number of total pages that should be rendered, depending on the passed items array length |

<br/>

#### Pagination Component

## Props

| Name                       | Type                                | Description                                                                                                                                                                                                                                                                                                                            |
| -------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currentPageNumber`        | `Number`                            | **Required:** The current page number state. <br/> You can either get it from usePagination hook or you can pass you own currentPageNumber state.                                                                                                                                                                                      |
| `numberOfPages`            | `Number`                            | **Required:** The number of total pages that should be generated. <br/> You can either get it from usePagination hook or you can pass you own numberOfPages state.                                                                                                                                                                     |
| `onPageChange`             | `Function: (page,pageRef)=>{}`      | **Optional:** the handler function to handle changing pages, it gets passed the currentPageNumber and the the dom reference for current page. <br/> **_Note:_** this is an optinal property, the package already handles changing pages out of the box, but incase you wanted to handle changing pages with your own function handler. |
| `nextLabel`                | `String or Refrence to A Component` | **Optional:** The next button text label. <br/> Default is : `❯`                                                                                                                                                                                                                                                                       |
| `nextBtnClass`             | `String`                            | **Optional:** A class name to apply to the next button. <br/> Default is `btn`                                                                                                                                                                                                                                                         |
| `prevLabel `               | `String or Refrence to A Component` | **Optional:** The prev button text label. <br/> Default is : `❮`                                                                                                                                                                                                                                                                       |
| `prevBtnClass`             | `String`                            | **Optional:** A class name to apply to the prev button. <br/> Default is `btn`                                                                                                                                                                                                                                                         |
| `pageStyle`                | `Object`                            | **Optional:** The defualt page style object with color and backgroundColor properties. <br/> Default is:`{ color:#A0A7B9, backgroundColor: transparent }`                                                                                                                                                                              |
| `activePageSyle`           | `Object`                            | **Optional:** The acitve page style object with color and background propeties. <br/> Default is `{ color:white, backgroundColor: #8D00D8 }`                                                                                                                                                                                           |
| `pageClass`                | `String`                            | **Optional:** A class name to apply to each page. <br/> The default class is `pageNumber`                                                                                                                                                                                                                                              |
| `activePageClass`          | `String`                            | **Optional:** A class name to to apply to the current acitve page or the page that being hovered. <br/> Default is `undefined`                                                                                                                                                                                                         |
| `paginationContainerClass` | `String`                            | **Optional:** A class name to apply to the parent container for the whole component. <br/> Default is `pagination`                                                                                                                                                                                                                     |
| `pagesContianerClass`      | `String`                            | **Optional:** A class name to apply to the direct parent of the pages. <br/> Default is `pages`                                                                                                                                                                                                                                        |

## Demo

To run the demo locally, clone the repository and move into it:

```console
git clone git@github.com:amjed-98/ts-react-pagination.git
cd ts-react-pagination
```

Install dependencies:

```console
npm install | yarn
```

preview the Demo

```console
npm run demo | yarn demo
```

Open your browser and go to [http://127.0.0.1:5173/src/demo/index.html](http://127.0.0.1:5173/src/demo/index.html)

<img src="https://i.imgur.com/KbpKmVI.gif" alt="Pagination demo" />
