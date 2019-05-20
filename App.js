import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Image
} from 'react-native';
import axios from 'axios';

const { height, width } = Dimensions.get('window');
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      images: []
    };

    this.loadWallpapers = this.loadWallpapers.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  loadWallpapers() {
    axios
      .get(
        'https://api.unsplash.com/photos/random?count=30&client_id=896979fdb70f80865638d7a4648bf9ce309675335318933eab2bf990af42e295'
      )
      .then(
        function(response) {
          console.log(response.data);
          this.setState({ images: response.data, isLoading: false });
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {
        console.log('request completed');
      });
  }

  componentDidMount() {
    this.loadWallpapers();
  }
  renderItem(image) {
    return <View style={{ height, width }} />;
  }
  render() {
    return this.state.isLoading ? (
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ActivityIndicator size="large" color="grey" />
      </View>
    ) : (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <FlatList
          horizontal
          pagingEnabled
          data={this.state.images}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
