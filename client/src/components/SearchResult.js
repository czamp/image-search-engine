import React, { Component } from "react";
import {
  Image,
  Grid,
  Segment,
  Header,
  Icon,
  Modal,
  Button,
  Divider
} from "semantic-ui-react";

class SearchResult extends Component {
  state = {
    isExpanded: false
  };

  openModal = () => {
    this.setState({ isExpanded: true });
  };

  closeModal = () => this.setState({ isExpanded: false });

  render() {
    return (
      <Modal
        basic
        closeIcon
        trigger={
          <Image
            alt={this.props.alt}
            bordered
            href={this.props.url}
            key={this.props.url}
            open={this.state.isExpanded}
            onClose={this.closeModal}
            rel="noopener noreferrer"
            src={this.props.thumbnail}
            target={"blank"}
            wrapped
          />
        }
      >
        <Modal.Header>{this.props.alt}</Modal.Header>
        <Modal.Content>
          <Grid>
            <Grid.Column width={10}>
          <Image
            alt={this.props.alt}
            href={this.props.url}
            key={this.props.url}
            onClick={this.onExpand}
            rel="noopener noreferrer"
            src={this.props.image}
            target={"blank"}
            wrapped
            size={"large"}
          />
            </Grid.Column>
            <Grid.Column width={6}>
              <Button
                as="a"
                href={this.props.url}
                onClick={this.closeModal}
                target={"blank"}
                rel={"noopener noreferrer"}
                inverted
              >
                Visit Page
              </Button>
              <Button
                as="a"
                href={this.props.thumbnail}
                onClick={this.closeModal}
                target="blank"
                rel="noopener noreferrer"
                inverted
              >
                View Image
              </Button>
            </Grid.Column>
          </Grid>
          {/*<Divider />*/}
          {/*<Modal.Description>*/}
          {/*  <Button*/}
          {/*    as="a"*/}
          {/*    href={this.props.url}*/}
          {/*    onClick={this.closeModal}*/}
          {/*    target={"blank"}*/}
          {/*    rel={"noopener noreferrer"}*/}
          {/*    primary*/}
          {/*    inverted*/}
          {/*  >*/}
          {/*    Visit Page*/}
          {/*  </Button>*/}
          {/*  <Button*/}
          {/*    as="a"*/}
          {/*    href={this.props.thumbnail}*/}
          {/*    onClick={this.closeModal}*/}
          {/*    target="blank"*/}
          {/*    rel="noopener noreferrer"*/}
          {/*    primary inverted*/}
          {/*  >*/}
          {/*    View Image*/}
          {/*  </Button>*/}
          {/*</Modal.Description>*/}
        </Modal.Content>
      </Modal>
    );
  }
}

export default SearchResult;
