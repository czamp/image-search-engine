# image-search-engine
An abstraction layer for Bing image search

Created for the FreeCodeCamp project "Build an Image Search Abstraction Layer"

## API Endpoints

There are two API endpoints:

**`/api/search/:query`** returns a JSON object containing the first 20 image results for the given query, including a source URL, image URL, thumbnail URL, and alt text.

**`/api/history`** returns a JSON object containing the most recently searched queries (by all users)

### Usage

The `/api/search/:query` endpoint accepts two query parameters: **offset** and **safeSearch**.

Example: `/api/search/cats?offset=50&safeSearch=off` would return results 51-70 for the term 'cats', with safe search off.

`safeSearch` accepts three possible values: `off`, `moderate`, and `strict`.

By default, SafeSearch is off, offset is set to 0, and there are 20 results returned. Each new page of results has an offset of +20 results.
