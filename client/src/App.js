import React, { Component } from "react";
import {
  Loader,
  Segment,
  Form,
  Card,
  Container,
  Checkbox,
  Header,
  Pagination,
  Image
} from "semantic-ui-react";
import axios from "axios";

class App extends Component {
  state = {
    activePage: 1,
    isFetching: false,
    resultsReturned: false,
    safeSearch: false,
    searchResults: [],
    searchTerm: ""
  };

  // Search input handler
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  // Paginate search results
  handleOffsetChange = (e, { activePage }) => {
    this.setState({ activePage }, () => this.handleSubmit());
  };

  toggle = () => {
    this.setState({
      safeSearch: !this.state.safeSearch
    })
  }

  // Search for new term or next page of results
  handleSubmit = () => {
    // Set active page to 1 if new search term is entered
    if (this.state.searchTerm !== this.state.lastSearch) {
      this.setState({ activePage: 1 });
    }

    // Set component state for fresh search results
    this.setState({ isFetching: true, searchResults: [] });

    // query the search API
    axios
      .get(
        "/api/search/" +
          this.state.searchTerm +
          "?activePage=" +
          this.state.activePage +
          "&safeSearch=" +
          this.state.safeSearch
      )
      .then(res =>
        this.setState({
          isFetching: false,
          searchResults: res.data,
          lastSearch: this.state.searchTerm,
          resultsReturned: true
        })
      )
      .catch(err => console.log(err));
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
        <Container fluid>
          <Header as={"h1"} textAlign={"center"}>
            CZ Image Search
          </Header>
          <Segment vertical>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field width={16} >
                <Form.Input
                  fluid
                  width={16}
                  value={this.state.searchTerm}
                  onChange={this.handleChange}
                  placeholder={"Search for an image..."}
                  name="searchTerm"
                />
              </Form.Field>
              <Form.Group inline>
                <Checkbox checked={this.state.safeSearch} onChange={this.toggle} label={"Use SafeSearch"}/>
                <Form.Button primary onClick={this.handleSubmit}>Search</Form.Button>
              </Form.Group>
            </Form>
          </Segment>
          {this.state.resultsReturned && (
            <Segment vertical>
              {/*<Header size={"mini"}>More Results</Header>*/}

              <Pagination
                activePage={this.state.activePage}
                totalPages={10}
                onPageChange={this.handleOffsetChange}
              />
            </Segment>
          )}
          <Loader active={this.state.isFetching} />
          <Segment vertical>
            {this.state.searchResults.length > 0 && (
              <React.Fragment>
                <Image.Group size="medium">
                  {this.state.searchResults.map(result => (

                      <Image
                        key={result.url}
                        src={result.url}
                        wrapped
                        alt={result.alt}
                        as="a"
                        href={result.url}
                        target={"blank"}
                        rel="noopener noreferrer"
                      />

                  ))}
                </Image.Group>
              </React.Fragment>
            )}
          </Segment>
        </Container>
      </div>
    );
  }
}

export default App;
