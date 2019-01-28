import React, { Component } from "react";
import { Animated, Dimensions } from "react-native";
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  Image,
  ScrollView,
  Button,
  LayoutAnimation,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
  Easing,
  AsyncStorage,
  Platform,
  UIManager,
  TouchableOpacity
} from "react-native";

let deviceWidth = Dimensions.get("window").width;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const { width } = Dimensions.get("window");

const datasets = [
  { key: 1 },
  { key: 2 },
  { key: 3 },
  { key: 4 },
  { key: 5 },
  { key: 6 }
];
const datasets2 = [
  { key: 1 },
  { key: 2 },
  { key: 3 },
  { key: 4 },
  { key: 5 },
  { key: 6 }
];

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fadeIn: new Animated.Value(0),
      fadeOut: new Animated.Value(1),
      scrollX: new Animated.Value(0),
      scrollX2: 0
    };
    this.animatedValue = new Animated.Value(0);
    this.spainValue = new Animated.Value(0);
    this.springValue = new Animated.Value(0.3);
  }

  componentDidMount() {
    this.animate();
  }
  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear
    }).start(() => this.animate());
  }

  spring() {
    this.springValue.setValue(0.3);
    Animated.spring(this.springValue, {
      toValue: 1,
      friction: 1
    }).start();
  }

  config = {
    duration: 300,
    create: {
      type: "easeIn",
      property: "opacity",
      duration: 50
    },
    update: {
      type: "easeOut",
      property: "scaleXY",
      duration: 50
    },
    delete: {
      type: "spring",
      springDamping: 0.2,
      property: "scaleXY",
      duration: 50
    }
  };

  changeButton = () => {
    LayoutAnimation.configureNext(this.config);
    this.setState({ btn: !this.state.btn });
  };

  render() {
    var scrollIndicator = datasets;

    const marginLeft = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 50]
    });

    // const opacity = this.animatedValue.interpolate({
    //     inputRange: [0, 0.5, 1],
    //     outputRange: [0, 1, 0]
    // })

    const textSize = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [18, 32, 18]
    });
    let position = Animated.divide(this.state.scrollX, width);

    return (
      <Animated.View style={styles.container}>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          style={{ height: 450 }}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: this.state.scrollX } } }
          ])}
          scrollEventThrottle={16}
        >
          {datasets.map((source, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 0.1, i, i + 0.1],
              outputRange: [0.0, 1, 0.0],
              extrapolate: "extend"
            });
            return (
              <View key={i} style={{ width: deviceWidth }}>
                <TouchableOpacity onPress={this.fadeout} activeOpacity={0.9}>
                  <Image
                    source={require("../Assets/Images/chevrolet.png")}
                    resizeMode={"cover"}
                    style={{
                      width: deviceWidth,
                      height: 600,
                      position: "absolute"
                    }}
                  />
                </TouchableOpacity>
                <View style={{ alignItems: "center" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 40,
                      justifyContent: "space-between",
                      width: 310,
                      height: 40,
                      marginTop: 60
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={require("../Assets/Images/chevrolet.png")}
                        style={{ width: 30, height: 30, borderRadius: 4 }}
                      />
                      <Animated.View>
                        <Animated.Text
                          style={[
                            {
                              color: "white",
                              marginLeft: 20,
                              fontWeight: "600"
                            },
                            { opacity }
                          ]}
                        >
                          KARIM
                        </Animated.Text>
                      </Animated.View>
                    </View>
                    <TouchableHighlight
                      underlayColor={"rgba(0,0,0,.5)"}
                      onPress={this.changeButton}
                      style={this.state.btn ? styles.searchon : styles.seachoff}
                    >
                      {this.state.btn ? (
                        <Text style={{ color: "white" }}>search here.....</Text>
                      ) : (
                        <View>
                          <Image
                            source={require("../Assets/Images/chevrolet.png")}
                            style={{ marginTop: 10, width: 30, height: 30 }}
                          />
                        </View>
                      )}
                    </TouchableHighlight>
                  </View>
                </View>

                <View
                  style={{ width: 180, height: 330, justifyContent: "center" }}
                >
                  <Image
                    source={require("../Assets/Images/chevrolet.png")}
                    style={{ marginLeft: 90 }}
                  />

                  <Text
                    style={{ fontSize: 100, color: "#f2f2f2", marginLeft: 30 }}
                  >
                    2
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{ color: "#B1B6BA", marginLeft: 40, fontSize: 18 }}
                    >
                      Rank
                    </Text>
                    <Animated.View style={{ marginLeft }}>
                      <Image
                        source={require("../Assets/Images/chevrolet.png")}
                        style={{ width: 10, height: 10, marginLeft: 10 }}
                      />
                    </Animated.View>
                  </View>
                  <View style={{ justifyContent: "center", marginTop: 70 }}>
                    <View
                      style={{
                        width: 170,
                        height: 3,
                        backgroundColor: "rgba(204,204,204,.5)"
                      }}
                    >
                      <View
                        style={{
                          width: 100,
                          height: 3,
                          backgroundColor: "white"
                        }}
                      />
                    </View>

                    <Text
                      style={{
                        color: "#B1B6BA",
                        marginTop: 15,
                        fontSize: 10,
                        marginLeft: 50
                      }}
                    >
                      9,425/40,000
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <Animated.View
          style={{ flexDirection: "row", height: 20, justifyContent: "center" }}
        >
          {scrollIndicator.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 0.1, i, i + 50],
              outputRange: [0.0, 1, 0.0],
              extrapolate: "extend"
            });
            return (
              <Animated.View
                key={i}
                style={{
                  opacity,
                  height: 10,
                  width: 10,
                  backgroundColor: "#595959",
                  borderRadius: 5,
                  margin: 5
                }}
              />
            );
          })}
        </Animated.View>

        <View
          style={{
            flex: 3.3,
            justifyContent: "center",
            flexDirection: "row",
            zIndex: 1
          }}
        >
          <FlatList
            data={datasets2}
            keyExtractor={item => item.titlenumber}
            horizontal={true}
            renderItem={({ item }) => {
              return (
                <View style={{ justifyContent: "center", marginBottom: 10 }}>
                  <View style={styles.list}>
                    <Text style={{ fontSize: 28, color: "black" }}>Karim</Text>
                    <Text style={{ color: "#b3b3b3", marginTop: 5 }}>
                      MAMMAD
                    </Text>
                  </View>
                </View>
              );
            }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              marginTop: 85,
              position: "absolute",
              right: 20
            }}
          >
            <TouchableHighlight>
              <Animated.View
                style={{
                  width: 100,
                  height: 50,
                  backgroundColor: "#1a1a1a",
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "flex-end",
                  transform: [{ scale: this.springValue }]
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 16, fontWeight: "700" }}
                  onPress={this.spring.bind(this)}
                >
                  Stats
                </Text>
              </Animated.View>
            </TouchableHighlight>
          </View>
        </View>

        <View
          style={{
            flex: 6,
            backgroundColor: "#f0f2f4",
            zIndex: -1,
            justifyContent: "space-between",
            flexDirection: "row"
          }}
        >
          <View style={{ marginLeft: 20 }}>
            <View
              style={{ flexDirection: "row", marginTop: 50, marginLeft: 30 }}
            >
              <Text style={{ fontSize: 18, fontWeight: "500" }}>Activity</Text>
              <Image source={require("../Assets/Images/chevrolet.png")} />
              <Image source={require("../Assets/Images/chevrolet.png")} />
            </View>
            <View
              style={{ flexDirection: "row", marginTop: 30, marginLeft: 30 }}
            >
              <View
                style={{
                  width: 40,
                  height: 50,
                  backgroundColor: "#d9d9d9",
                  borderRadius: 5
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  marginLeft: 20,
                  marginTop: 5
                }}
              >
                Map
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 60, marginRight: 50 }}>
            <TouchableHighlight onPress={this.spring.bind(this)}>
              <Animated.Image
                source={require("../Assets/Images/chevrolet.png")}
                style={{
                  width: 30,
                  height: 30,
                  width: textSize,
                  height: textSize
                }}
              />
            </TouchableHighlight>
          </View>
        </View>
      </Animated.View>
    );
  }
}

class TitleComponent extends Component {
  constructor(porps) {
    super(porps);

    this.state = {
      fadeIn: new Animated.Value(0),
      fadeOut: new Animated.Value(1)
    };
  }

  fadeIn() {
    this.state.fadeIn.setValue(0);
    Animated.timing(this.state.fadeIn, {
      toValue: 1,
      duration: 3000
    }).start(() => this.fadeOut());
  }

  fadeOut() {
    this.state.fadeOut.setValue(1);
    Animated.timing(this.state.fadeOut, {
      toValue: 0,
      duration: 3000
    }).start();
  }

  componentDidMount() {
    this.fadeIn();
  }

  render() {
    return (
      <Animated.View style={{ opacity: this.state.fadeIn }}>
        <Text style={{ color: "white", marginLeft: 20, fontWeight: "600" }}>
          ALI
        </Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    width: 150,
    height: 80,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#f2f2f2",
    paddingBottom: 20
  },
  searchon: {
    width: 200,
    height: 50,
    backgroundColor: "rgba(0,0,0,.5)",
    elevation: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  seachoff: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(0,0,0,.5)",
    elevation: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center"
  }
});
