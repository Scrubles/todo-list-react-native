import React, { Component } from 'react';
import { Body, Container, Content, Header, List, ListItem, Text, Title } from 'native-base';

const routes = [
  {
    key: 'ToDoList',
    value: 'To Do List'
  },
  {
    key: 'About',
    value: 'About'
  }
];

export default class Sidebar extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Menu</Title>
          </Body>
        </Header>
        <Content style={{ backgroundColor: '#FFFFFF' }}>
          <List dataArray={routes}
            renderRow={(entry) =>
              <ListItem button onPress={() => this.props.navigation.navigate(entry.key)}>
                <Text>{entry.value}</Text>
              </ListItem>
            }
          />
        </Content>
      </Container>
    );
  }
}
