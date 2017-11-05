import React, { Component } from 'react';
import { Body, Button, Container, Content, Header, Icon, Left, Text, Title } from 'native-base';

export default class About extends Component {

  constructor(props) {
    super(props);
    this.openDrawer = this.openDrawer.bind(this);
  }

  openDrawer() {
    this.props.navigation.navigate('DrawerOpen');
  }

  render() {
    return (
      <Container>
        <Header hasSegment searchBar>
          <Left>
            <Button transparent onPress={this.openDrawer}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>About</Title>
          </Body>
        </Header>
        <Content padder>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Proin cursus aliquet dapibus. Ut facilisis aliquam tellus, et porta purus condimentum a.
            Pellentesque et ipsum eu ante venenatis posuere non vel sapien.
            Etiam vel faucibus risus. Praesent dictum nunc enim, vel dictum urna viverra non.
            Aenean a fringilla ex. Vivamus sit amet enim tortor.
            Nullam ultricies tellus eu magna accumsan, non rhoncus risus fringilla.
            Phasellus sed tempor est, et fermentum massa. Proin id orci eget dolor mattis mattis.
            Nam ut sagittis odio, eget ornare lectus.
          </Text>
        </Content>
      </Container>
    );
  }
}
