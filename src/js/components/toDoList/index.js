import React, { Component } from 'react';
import { ListView, Modal, View } from 'react-native';
import {
  Body, Button, Container, Content, Fab, Form, Header, Icon,
  Input, Item, List, ListItem, Text, Title, Segment
} from 'native-base';
import firebase from 'firebase';

export default class ToDoList extends Component {

  segments = ['To Do', 'Done'];
  toDoIndex = 0;

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      selectedIndex: 0,
      items: [],
      modalVisible: false,
      formItem: {}
    }
    this.openDrawer = this.openDrawer.bind(this);
    this.filterAndSort = this.filterAndSort.bind(this);
    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.save = this.save.bind(this);
    this.toggleDone = this.toggleDone.bind(this);
  }

  componentWillMount() {
    db = firebase.database().ref('items');
    db.on('value', (snapshot) => {
      let items = [];
      const values = snapshot.val();
      for (let key in values)
        items.push({ key, ...values[key] });
      this.setState({ ...this.state, items });
    });
  }

  openDrawer() {
    this.props.navigation.navigate('DrawerOpen');
  }

  filterAndSort(items) {
    return items
      .filter((item) => item.text.toUpperCase().indexOf(this.state.searchText.toUpperCase()) !== -1)
      .filter((item) => this.state.selectedIndex === this.toDoIndex ? !item.done : item.done)
      .sort((i1, i2) => i1.text.toUpperCase().localeCompare(i2.text.toUpperCase()));
  }

  openForm(item) {
    this.setState({
      ...this.state,
      modalVisible: true,
      formItem: item ? { ...item } : { text: '', done: false }
    });
  }

  closeForm() {
    this.setState({ ...this.state, modalVisible: false });
  }

  save() {
    this.closeForm();
    setTimeout(() => {
      if (this.state.formItem.key)
        this.update({ ...this.state.formItem });
      else
        this.add({ ...this.state.formItem });
    }, 200);
  }

  toggleDone(item) {
    this.update({ ...item, done: !item.done });
  }

  add(item) {
    db.push().set(item);
  }

  update(item) {
    const { text, done } = item;
    db.child(item.key).set({ text, done });
  }

  remove(key) {
    db.child(key).remove();
  }

  closeRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
  }

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Container> 
        <Header hasSegment searchBar>
          <Item>
            <Button transparent dark style={{ bottom: 2 }} onPress={this.openDrawer}>
              <Icon name="menu" />
            </Button>
            <Input placeholder="Search" value={this.state.searchText}
              onChangeText={(searchText) => this.setState({ ...this.state, searchText })} />
            <Icon name="md-search" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Segment>
          {
            this.segments.map((segment, i) =>
              <Button first={i === 0} last={i === this.segments.length - 1}
                active={i === this.state.selectedIndex}
                onPress={() => this.setState({ ...this.state, selectedIndex: i })}>
                <Text>{segment}</Text>
              </Button>
            )
          }
        </Segment>
        <Content>
          <List
            dataSource={ds.cloneWithRows(this.filterAndSort(this.state.items))}
            renderRow={(item) =>
              <ListItem>
                <Body>
                  <Text>{item.text}</Text>
                </Body>
              </ListItem>
            }
            renderLeftHiddenRow={(item, secId, rowId, rowMap) =>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Button full warning onPress={() => {
                  this.openForm(item);
                  this.closeRow(secId, rowId, rowMap);
                }} style={{ height: 55 }}>
                  <Icon active name="create" />
                </Button>
                <Button full light onPress={() => {
                  this.toggleDone(item);
                  this.closeRow(secId, rowId, rowMap);
                }} style={{ height: 55 }}>
                  <Icon active name="md-checkbox-outline" />
                </Button>
              </View>
            }
            renderRightHiddenRow={(item, secId, rowId, rowMap) =>
              <Button full danger onPress={() => {
                this.remove(item.key);
                this.closeRow(secId, rowId, rowMap);
              }}>
                <Icon active name="trash" />
              </Button>
            }
            leftOpenValue={120}
            rightOpenValue={-75}
          />
        </Content>
        <Fab style={{ backgroundColor: '#32db64' }} position="bottomRight"
          onPress={() => this.openForm()}>
          <Icon name="md-add" />
        </Fab>
        <Modal animationType="slide" transparent={false} visible={this.state.modalVisible}
          onRequestClose={this.closeForm}>
          <Container>
            <Header>
              <Body>
                <Title>Item</Title>
              </Body>
            </Header>
            <Content>
              <Form>
                <Item>
                  <Input placeholder="Name" value={this.state.formItem.text}
                    onChangeText={(text) => this.setState({
                      ...this.state,
                      formItem: { ...this.state.formItem, text }
                    })} />
                </Item>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Button light style={{ margin: 10 }} onPress={this.closeForm}>
                    <Text>Cancel</Text>
                  </Button>
                  <Button style={{ margin: 10, marginLeft: 0 }} onPress={this.save}>
                    <Text>Save</Text>
                  </Button>
                </View>
              </Form>
            </Content>
          </Container>
        </Modal>
      </Container>
    );
  }
}
