import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableHightlight,
  Animated,
  Dimensions
} from "react-native";
import Data from "./Data";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;
export default class Corvettes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollX: new Animated.Value(0),
      upMove: new Animated.Value(0),
      upOpacity: new Animated.Value(0)
    };
  }

  UpAndFade() {
    this.state.upOpacity.setValue(0);
    this.state.upMove.setValue(0);
    Animated.sequence([
      Animated.timing(this.state.upOpacity, { toValue: 0, duration: 100 }),
      Animated.parallel([
        Animated.timing(this.state.upOpacity, { toValue: 1, duration: 750 }),
        Animated.timing(this.state.upMove, {
          toValue: 1,
          duration: 750
        })
      ])
    ]).start();
  }
  onScroller(event) {
    Animated.event([
      ({ nativeEvent }) => {
        this.setState({ scrollX: nativeEvent.contentOffset.x });
      },
      console.warn("hello")
    ])(event);
  }

  componentDidMount() {
    this.UpAndFade();
  }

  render() {
    let scrollIndicator = Data;
    // let position = Animated.divide(this.state.scrollX , deviceWidth);
    // let positionIndex = Math.round(this.state.scrollX/deviceWidth) || 0 ;
    // this.setState({animatedPosition:positionIndex})
    // console.warn(positionIndex)
    let position = Animated.divide(this.state.scrollX, deviceWidth);

    // let opacity = position.interpolate({
    //   inputRange: [0, 1, 2],
    //   outputRange: [0.5, 1, 0.5],
    //   extrapolate: "extend"
    // });

    // Data.map((item, index) => {
    //    opacity = position.interpolate({
    //       inputRange: [index - .8, index, index + .8],
    //       outputRange: [0.5, 1, 0.5],
    //       extrapolate: 'extend',
    //    } ) })

    const marginToper = this.state.upMove.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 20]
    });

    const marginRighter = this.state.upMove.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 5]
    });

    const opacityRR = position.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0.3, 1, 0],
      extrapolate: "extend"
    });

    return (
      <View style={styles.container}>
        <View style={styles.pageHeader}>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
            Timeline
          </Text>
        </View>
        <Animated.View style={styles.flatlistContainer}>
          <FlatList
            data={Data}
            horizontal
            pagingEnabled
            scrollEventThrottle={10}
            // onScroll={Animated.event([({ nativeEvent }) => {this.setState({ scrollX: nativeEvent.contentOffset.x }); } ,console.warn('hello') ])(event)}

            // onScroll={this.onScroller.bind(this)}

            onScroll={({ nativeEvent }) => {
              this.setState({ scrollX: nativeEvent.contentOffset.x }, () => {
                this.UpAndFade();
              });
            }}
            // onScroll={ Animated.event([({ nativeEvent }) => {
            //   this.setState({ scrollX: nativeEvent.contentOffset.x });
            // },])     }

            // onScroll={Animated.event([
            //   (({ nativeEvent }) => {
            //       this.setState({ scrollX: nativeEvent.contentOffset.x });
            //     })])}

            keyExtractor={item => item.key}
            renderItem={({ item }) => {
              return (
                <Animated.View key={item} style={styles.flatlistPage}>
                  <View style={styles.imageWrapper}>
                    <Image source={item.image} style={styles.carsImages} />
                  </View>
                  <View style={styles.introCars}>
                    <View style={styles.buildYear}>
                      {/* <Animated.Text  style={{fontWeight:'800',fontSize:40,color:'#eee',paddingTop: paddingTop || 1,
              opacity: this.state.upOpacity,}}>{item.startyear} - </Animated.Text>
                      <Animated.Text  style={{fontWeight:'800',fontSize:40,color:'#888',paddingTop: paddingTop || 1,
              opacity: this.state.upOpacity,}}>{item.endyear}</Animated.Text>
               */}

                      {/* {Data.map((_, i) => {
                          let opacity = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [0.5, 1, 0.5],
                            extrapolate: "extend"
                          });
                          // const marginToper = this.state.upMove.interpolate({
                          //   inputRange: [0, 1],
                          //   outputRange: [50, -50]
                          // });
                          return (
                            <Animated.Text
                              style={{
                                fontWeight: "800",
                                fontSize: 40,
                                color: "#fff",
                                paddingTop: paddingTop || 1,
                                opacity
                              }}
                            >
                              {_.key}
                            </Animated.Text>
                          );
                        })} */}

                      <View
                        style={{
                          flexDirection: "row",
                          borderColor: "red",
                          borderWidth: 3,
                          height: 75
                        }}
                      >
                        {Data.map((cars, i) => {
                          const opacity = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [0.3, 1, 0],
                            extrapolate: "extend"
                          });
                          const fontSizer = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [25, 50, 25]
                          });
                          const topPadder = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [0, 10, 0]
                          });

                          return (
                            <Animated.View
                              key={i}
                              style={{
                                opacity,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 50,
                                transform: [{ scaleY: 1.25 }]
                              }}
                            >
                              <Animated.Text
                                style={{
                                  opacity: this.state.upOpacity,
                                  color: "#fff",
                                  fontSize: fontSizer,
                                  fontWeight: "800",
                                  fontFamily: "monospace",
                                  paddingTop: topPadder || 1,
                                  marginTop: marginToper,
                                  marginRight: marginRighter,
                                  fontFamily: "serif"
                                }}
                              >
                                {cars.startyear}{" "}
                              </Animated.Text>
                            </Animated.View>
                          );
                        })}
                      </View>
                      <View style={styles.mainInfo}>
                        <Animated.View style={styles.pagerCount}>
                          {Data.map((item, i) => {
                            const opacityRR = position.interpolate({
                              inputRange: [i - 1, i, i + 1],
                              outputRange: [0.5, 1, 0.5],
                              extrapolate: "clamp"
                            });
                            return (
                              <Animated.View
                                key={i}
                                style={{
                                  borderColor: "gold",
                                  borderWidth: 3,
                                  // opacity: this.state.upOpacity,
                                  opacity: opacityRR,
                                  padding: 5,
                                  justifyContent: "space-evenly",
                                  alignItems: "center"
                                }}
                              >
                                <Animated.Text
                                  style={{
                                    color: "#eee",
                                    transform: [{ scaleY: 1.3 }],
                                    fontSize: 16
                                  }}
                                >
                                  {item.key}
                                </Animated.Text>
                                <Animated.View
                                  style={{
                                    width: 5,
                                    height: 5,
                                    borderRadius: 50,
                                    backgroundColor: "#fff"
                                  }}
                                />
                              </Animated.View>
                            );
                          })}
                        </Animated.View>

                        <Animated.View
                          style={[
                            styles.carName,
                            {
                              paddingBottom: marginToper,
                              opacity: this.state.upOpacity
                            }
                          ]}
                        >
                          <Animated.Text style={styles.nameTxt}>
                            {item.build}
                          </Animated.Text>
                          <Animated.Text style={styles.nameTxt}>
                            {item.name}
                          </Animated.Text>
                        </Animated.View>
                        <View style={styles.descriptionPart}>
                          <View style={styles.productionView}>
                            <Text style={styles.ProductHistory}>
                              Production
                            </Text>
                            <Text style={styles.ProductHistory}>
                              {item.startyear} - {item.endyear}
                            </Text>
                          </View>
                          <View style={styles.decsiptionView}>
                          <Text style={{borderWidth:2,borderColor:'dodgerblue'}}>{item.description}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      width: 150,
                      height: 150,
                      backgroundColor: "#fff",
                      zIndex: 3
                    }}
                  />
                </Animated.View>
              );
            }}
          />
        </Animated.View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  },
  carsImages: {
    width: deviceWidth,
    height: deviceHeight - 125,
    position: "absolute"
  },
  imageWrapper: {
    // width:600,
    // height:600,
    // position: 'absolute',
    width: deviceWidth,
    // height:deviceHeight,

    borderColor: "red",
    // borderWidth: 5,
    zIndex: -1
    // marginBottom:50
  },
  introCars: {
    height: deviceHeight,
    backgroundColor: "rgba(125,125,125,0.1)",
    zIndex: 1,
    // justifyContent: 'flex-end',
    borderColor: "red",
    // borderWidth: 3,
    marginTop: 65
  },
  flatlistPage: {},
  pageHeader: {
    width: deviceWidth,
    // borderWidth: 3,
    borderColor: "#fff",
    position: "absolute",
    top: 0,
    height: 65,
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  txt: {
    color: "#fff",
    fontSize: 16
  },
  buildYear: {
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    borderWidth: 3,
    borderColor: "blue",
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 125
  },
  mainInfo: {
    borderColor: "red",
    borderWidth: 3
  },
  pagerCount: {
    borderColor: "purple",
    borderWidth: 4,
    flexDirection: "row"
  },
  nameTxt: {
    color: "rgba(200,200,200,0.7)",
    fontFamily: "serif",
    fontWeight: "800",
    fontSize: 38
  },
  carName: {
    borderColor: "gold",
    borderWidth: 3,
    borderBottomColor: "#777",
    borderBottomWidth: 6
  },
  descriptionPart: {
    borderColor: "lime",
    borderWidth: 3,
    height: 65,
    justifyContent: "center",
    flexDirection:'row',
    // flex:1
  },
  ProductHistory: {
    fontSize: 14,
    color: "#eee",
    borderColor:'red',
    borderWidth:3
  },
  productionView: {
    backgroundColor: "purple",
    borderWidth:3,
    flex:1
  },
  decsiptionView:{
    backgroundColor:'gold',
    borderWidth:3,
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection:"row"
  }
});
