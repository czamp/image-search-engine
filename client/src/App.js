import React, { Component } from "react";
import {
  Loader,
  Segment,
  Form,
  Card,
  Container,
  Header,
  Image
} from "semantic-ui-react";
import axios from "axios";
import querystring from 'querystring';

class App extends Component {
  state = {
    isFetching: false,
    searchResults: [],
    searchTerm: "",
    offset: 1
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    this.setState({ isFetching: true, searchResults: [] });
    axios
      .get("/api/search/" + this.state.searchTerm + '?offset=' + this.state.offset)
      .then(res =>
        this.setState({
          isFetching: false,
          searchResults: res.data
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
              <Form.Field width={16}>
                <Form.Input
                  fluid
                  width={16}
                  value={this.state.searchTerm}
                  onChange={this.handleChange}
                  placeholder={"Search for an image..."}
                  name="searchTerm"
                />
              </Form.Field>
            </Form>
          </Segment>
          <Loader active={this.state.isFetching} />
          <Segment vertical>
            <Card.Group>
              {this.state.searchResults.length > 0 &&
                this.state.searchResults.map(result => (
                  <Card key={result.alt}>
                    <Image src={result.url} wrapped alt={result.alt} />
                  </Card>
                ))}
            </Card.Group>
          </Segment>
        </Container>
      </div>
    );
  }
}

export default App;
