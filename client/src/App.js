import React, { Component } from "react";
import { Checkbox, Container, Form, Header, Image, List, Loader, Message, Pagination, Segment } from "semantic-ui-react";
import axios from "axios";

class App extends Component {
  state = {
    activePage: 1,
    inputError: false,
    isFetching: false,
    isLoading: true,
    numPages: "",
    recentSearches: [],
    resultsReturned: false,
    safeSearch: false,
    searchResults: [],
    searchTerm: ""
  };

  componentWillMount() {
    this.getSearchHistory();
  }

  getSearchHistory = () => {
    axios
      .get("/api/history")
      .then(res => {
        if (res.data.length < 1) {
          this.getSearchHistory();
        } else {
          return this.setState({
            recentSearches: res.data.reverse(),
            isLoading: false
          });
        }
      })
      .catch(err => console.log(err));
  };

  // Search input handler
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value, inputError: false });
  };

  // Search for new term or next page of results
  handleSubmit = () => {
    if (this.state.searchTerm === '') {
      this.setState({inputError: true})
      return;
    }
    // Set active page to 1 if new search term is entered
    if (this.state.searchTerm !== this.state.lastSearch) {
      this.setState({ activePage: 1 });
    }

    // Set component state for fresh search results
    this.setState({ isFetching: true, searchResults: [] });

    let safeSearch = this.state.safeSearch ? "moderate" : "off";
    // query the search API
    axios
      .get(
        "/api/search/" +
        this.state.searchTerm +
        "?offset=" +
        this.state.activePage +
        "&safeSearch=" +
        safeSearch
      )
      .then(res =>
        this.setState({
          isFetching: false,
          searchResults: res.data.searchResults,
          numPages: res.data.pages,
          lastSearch: this.state.searchTerm,
          resultsReturned: true
        })
      )
      .catch(err => console.log(err));
  };

  // Paginate search results
  paginate = (e, { activePage }) => {
    this.setState({ activePage }, () => this.handleSubmit());
  };

  searchRecent = e => {
    this.setState({ searchTerm: e.target.name }, () => this.handleSubmit());
  };

  toggle = () => {
    this.setState({
      safeSearch: !this.state.safeSearch
    });
  };

  render() {
    return (
      <div
        style={{
          minHeight: "100vh",
          minWidth: "100vw",
          padding: "2rem"
        }}
      >
        <Container>
          <Header
            as={"h1"}
            color={"orange"}
            textAlign={"center"}
            style={{ fontFamily: "Righteous, cursive", fontSize: "5rem" }}
          >
            CZ PicSearch
          </Header>
          <Segment vertical>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field width={16}>
                <Form.Input
                  fluid
                  name="searchTerm"
                  error={this.state.inputError}
                  onChange={this.handleChange}
                  placeholder={"Search for an image..."}
                  width={16}
                  value={this.state.searchTerm}
                />
              </Form.Field>
              <Form.Group inline width={16}>
                <Form.Button fluid color={"orange"} onClick={this.handleSubmit}>
                  Search
                </Form.Button>
                <Checkbox
                  checked={this.state.safeSearch}
                  label={"Use SafeSearch"}
                  onChange={this.toggle}
                />
              </Form.Group>
            </Form>
                {this.state.inputError && <Message error>Please enter a search term</Message>}
          </Segment>
          {this.state.recentSearches.length > 0 && (
            <Segment vertical>
              <Header size={"mini"}>Last 10 Searches</Header>
              <List horizontal>
                {this.state.recentSearches.slice(0, 10).map((search, i) => {
                  const search_term = search.search_term;
                  return (
                    <List.Item
                      as={"a"}
                      key={i}
                      name={search_term}
                      onClick={this.searchRecent}
                      style={{ color: "#f2711c" }}
                    >
                      {search.search_term}
                    </List.Item>
                  );
                })}
              </List>
            </Segment>
          )}
        </Container>
        <Container>
          {this.state.resultsReturned && (
            <Segment vertical>
              <Pagination
                activePage={this.state.activePage}
                firstPage={null}
                lastPage={null}
                onPageChange={this.paginate}
                totalPages={this.state.numPages}
              />
            </Segment>
          )}

          <Loader active={this.state.isFetching} />
          <Segment vertical>
            {this.state.searchResults.length > 0 && (
              <React.Fragment>
                <Image.Group size="small">
                  {this.state.searchResults.map(result => (
                    <Image
                      alt={result.alt}
                      as="a"
                      bordered
                      href={result.url}
                      key={result.url}
                      rel="noopener noreferrer"
                      src={result.thumbnail}
                      target={"blank"}
                      wrapped
                    />
                  ))}
                </Image.Group>
              </React.Fragment>
            )}
          </Segment>
          {this.state.resultsReturned && (
            <Segment vertical>
              <Pagination
                activePage={this.state.activePage}
                firstItem={null}
                lastItem={null}
                onPageChange={this.paginate}
                totalPages={this.state.numPages}
              />
            </Segment>
          )}
        </Container>
      </div>
    );
  }
}

export default App;
