import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  Animated,
  Dimensions,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Easing,
  Image
} from "react-native";
// import Data from "./Data";

let data = [
  { text: "Get Familier With TeraMo.io" },
  { text: "99.99% Relibility" },
  { text: "Full Access Panel" },
  { text: "New 'X' Feature" },
  { text: "Start Your Free Trial Now" }
];

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;
export default class FreeFlatlist extends Component {
  constructor(props) {
    super(props);
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    this.state = {
      scrollX: new Animated.Value(0),
      transX: new Animated.Value(0),
      opacityUp: new Animated.Value(0),
      scrollY: new Animated.Value(0),
    //   decayPos:new Animated.Value(0)
    };
    this.isShowing = true;
    this.isLastPage = false;
  }


//   decayIn=()=>{
//     Animated.decay(this.state.decayPos, {   // coast to a stop
//         velocity: {x: gestureState.vx, y: gestureState.vy}, // velocity from gesture release
//         deceleration: 0.997,
//     }).start


//   }
  fadeIn = () => {
    // this.state.opacityUp.setValue(0);
    // this.state.transX.setValue(0);
   
    Animated.parallel([
      Animated.timing(this.state.opacityUp, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(this.state.transX, {
        toValue: 25,
        duration: 1000,
        easing: Easing.back(),
        useNativeDriver: true
      })
    ]).start();
  };

  fadeOut = () => {
    // this.state.opacityUp.setValue(0);
    // this.state.transX.setValue(0);
    Animated.parallel([
      Animated.timing(this.state.opacityUp, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true
      }),
      Animated.timing(this.state.transX, {
        toValue: 0,
        duration: 25,
        useNativeDriver: true
      })
    ]).start();
  };

  configfile = {
    create: {
      type: "easeIn",
      property: "opacity",
      duration: 300
    },
    update: {
      type: "easeIn",
      //   springDamping:0.5,
      property: "scaleXY",
      duration: 400
    },
    delete: {
      type: "easeIn",
      property: "opacity",
      duration: 300
    }
  };

  layAnimate = () => {
    LayoutAnimation.configureNext(this.configfile);
  };

  goDown = () => {
    // this.refs.feed.measure((x,y,width,heiht,pageX,pageY)=>
    // { this.refs._scrollview.scrollTo({y:pageY,animate:true}) })
    // console.warn(this.refs);
    this._MainScrollView.scrollTo({ x: 0, y: deviceHeight, Animated: true });
  };
  goFirst = () => {
    this._MainFlatlist.scrollToIndex({ index: 0, Animated: true });
  };

  componentDidMount() {
    this.fadeIn();
    // this.decayIn()
  }

  render() {
    let position = Animated.divide(this.state.scrollX, deviceWidth);
    let positionIndex = Math.round(this.state.scrollX / deviceWidth) || 0;
    // console.warn(positionIndex)
    return (
      <View style={styles.container}>
        <ScrollView
          pagingEnabled
          onScrollEndDrag={() => this.fadeIn()}
          onScrollBeginDrag={() => {
            this.fadeOut();
          }}
          //    onScroll={({ nativeEvent }) => {
          //       this.setState({ scrollX: nativeEvent.contentOffset.y })
          //     }}

          ref={ref => {
            this._MainScrollView = ref;
          }}
          // scrollTo={scrollTo({x: 0, y: 0, animated: true})}
        >
          <View
            style={{
              height: deviceHeight - 25,
              width: deviceWidth,
              backgroundColor: "#555",
              justifyContent: "center",
              alignItems: "center",
              padding: 50
            }}
          >
            <Animated.Text
              style={[
                styles.headerFont,
                {
                  opacity: this.state.opacityUp,
                  transform: [{ translateY: this.state.transX }]
                }
              ]}
            >
              A Reliable Industry Tested Service
            </Animated.Text>
            {/* <Animated.Text
              style={[
                styles.headerFont,
                {
                  opacity: this.state.opacityUp,
                  transform: [{ translateY: this.state.decayPos}]
                }
              ]}
            >
              A Reliable Industry Tested Service
            </Animated.Text> */}
            <Animated.View />
          </View>
          <TouchableHighlight
            onPress={this.goDown.bind(this)}
            underlayColor="rgba(150,150,150,0.5)"
            style={styles.dropButton}
          >
            <Image source={require('../Assets/Images/godown.png')}/>
          </TouchableHighlight>
          <FlatList
            data={data}
            ref={ref => {
              this._MainFlatlist = ref;
            }}
            keyExtractor={item => item.text}
            onScrollBeginDrag={() => {
              this.fadeOut();
            }}
            onScrollEndDrag={() => {
              this.fadeIn();
            }}
            onScroll={({ nativeEvent }) => {
              this.setState({ scrollX: nativeEvent.contentOffset.x });
            }}
            renderItem={({ item, index }) => {
              return (
                <Animated.View style={styles.pages}>
                  <Animated.View
                    style={{
                      // borderWidth: 3,
                      //   transform: [{ translateY: this.state.transX }],
                      //   borderWidth:3,
                      borderColor: "lime",
                      flex: 3,
                      justifyContent: "center",
                      alignItems: 'center',
                    }}
                  >
                    <Animated.Text
                      style={[
                        styles.titleFont,
                        {
                          opacity: this.state.opacityUp,
                          // opacity: position.interpolate({
                          //   inputRange: [index - 1, index, index + 1],
                          //   useNativeDriver: true,
                          //   outputRange: [0, 1, 0]
                          // })
                          //   borderWidth:3,
                          borderColor: "purple",
                          //   flex:1,
                          transform: [{ translateY: this.state.transX }],
                          padding: 20,
                        }
                      ]}
                    >
                      {item.text}
                    </Animated.Text>
                  </Animated.View>
                  <Animated.View style={styles.sliderview}>
                    {data.map((items, indexes) => {
                      //   console.warn(indexes);

                      const opacity = position.interpolate({
                        inputRange: [indexes - 1, indexes, indexes + 1],
                        outputRange: [0.5, 1, 0.5],
                        extrapolate: "clamp"
                      });
                      //   const borderWidth = position.interpolate({
                      //     inputRange: [indexes - 1, indexes, indexes + 1],
                      //     outputRange: [2, 1, 2],
                      //     extrapolate: "clamp"

                      //   });
                      const width = position.interpolate({
                        inputRange: [indexes - 1, indexes, indexes + 1],
                        outputRange: [9, 18, 9],
                        extrapolate: "clamp"
                      });

                      //   const height = position.interpolate({
                      //     inputRange: [indexes - 1, indexes, indexes + 1],
                      //     outputRange: [10, 11, 10],
                      //     // extrapolate: "clamp"
                      //   });

                      this.layAnimate();
                      return (
                        <Animated.View
                          style={{
                            backgroundColor: "#222",
                            height: 9,
                            width,
                            marginHorizontal: 10,
                            borderRadius: 50,
                            opacity,
                            borderWidth: 1,
                            borderColor: "#ccc"
                          }}
                          key={indexes}
                        />
                      );
                    })}

                    
                  </Animated.View>


                  {data.length - 1 === positionIndex
                      ? (this.isLastPage = true)
                      : (this.isLastPage = false)}
                    {this.isLastPage ? (
                      <TouchableHighlight
                        onPress={this.goFirst.bind(this)}
                        underlayColor="rgba(150,150,150,0.5)"
                        style={[styles.BackButton, { width:75 }]}
                      >
                        <Text>Go First</Text>
                      </TouchableHighlight>
                    ) : (
                      <TouchableHighlight
                        onPress={this.goFirst.bind(this)}
                        underlayColor="rgba(150,150,150,0.5)"
                        style={[styles.BackButton, { width: 30 }]}
                      >
                        <Image
                          source={require("../Assets/Images/goleft.png")}
                        />
                      </TouchableHighlight>
                    )}
                </Animated.View>
              );
            }}
            pagingEnabled
            horizontal
          />
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "red",
    // borderWidth: 4
  },
  pages: {
    width: deviceWidth,
    height: deviceHeight - deviceHeight * (2 / 100),

    borderColor: "royalblue",
    // borderWidth: 4,
    // backgroundColor:'royalblue',
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    padding: 25
  },
  tagPage: {
    width: deviceWidth,
    height: deviceHeight - deviceHeight * (2 / 100),
    borderColor: "lime",
    // borderWidth: 2,
    backgroundColor:'royalblue',
    alignItems: "center",
    justifyContent: "center"
  },
  titleFont: {
    fontSize: 30,
    color: "#222",
    fontFamily: "monospace",
    fontWeight: "100"
  },
  headerFont: {
    fontSize: 30,
    color: "#fff",
    fontFamily: "monospace",
    fontWeight: "100"
  },
  sliderview: {
    flexDirection: "row",
    justifyContent: "center",
    // borderWidth:3,
    borderColor: "blue",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  dropButton: {
    position: "absolute",
    zIndex: 2,
    backgroundColor: "rgba(200,200,200,0.5)",
    borderRadius: 50,
    height: 50,
    width: 50,
    bottom: deviceHeight + 25,
    left: deviceWidth / 2 - 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BackButton: {
    position: "absolute",
    zIndex: 4,
    backgroundColor: "rgba(200,200,200,0.5)",
    borderRadius: 50,
    height: 30,
    width: 30,
    bottom: 20,
    // left: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
