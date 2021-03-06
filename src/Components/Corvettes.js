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
  Dimensions,
  LayoutAnimation
} from "react-native";
import Data from "./Data";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;
export default class Corvettes extends Component {
  constructor(props) {
    super(props);
    this.duration = 500;
    this.state = {
      scrollX: new Animated.Value(0),
      upMove: new Animated.Value(0),
      upOpacity: new Animated.Value(0),
      Xtransform: new Animated.Value(0),
      isShowingName: true,
      ScrollState:0,
      ScrollNow:0,
     myopacity: new Animated.Value(0)
    };
  }

  flatlistHeader = () => {
    return (
      <View
        style={{
          borderColor: "gold",
          borderWidth: 4,
          borderRadius: 6,
          width: deviceWidth,
          height: deviceHeight,
          backgroundColor: "#333",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            borderColor: "dodgerblue",
            borderWidth: 4,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ fontFamily: "serif", color: "#fff", fontSize: 30 }}>
            WELCOME TO GRAND HALL OF HISTORICAL CORVETTES
          </Text>
        </View>
      </View>
    );
  };
  // clearAnimate(){
  //   Animated.timing(this.state.upOpacity, { toValue: 0, duration: 500 })

  // }

  // showmenu() {
  //   this.setState({ showNav: !this.state.showNav });
  // }

  // clearView(){
  //   Animated.timing(this.state.upOpacity, { toValue: 0.0, duration:25,useNativeDriver:true }).start()
  // }
  UpAndFade() {
    // this.setState({isShowingName:true})
    this.state.upOpacity.setValue(0);
    // this.state.upMove.setValue(0);
    // this.state.Xtransform.setValue(0)
    Animated.sequence([
      
      Animated.timing(this.state.Xtransform, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true
      }),

      Animated.parallel([
        Animated.timing(this.state.Xtransform, {
          toValue: 50,
          duration: 1000,
          useNativeDriver: true
        }),

        Animated.timing(this.state.upOpacity, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true
        }),
        Animated.timing(this.state.upMove, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true
        })
      ])
    ]).start();
    this.setState({isShowingName:true})
  }

  // configlayouts = {
  //   create: {
  //     type: "spring",
  //     springDamping: 0.5,
  //     property: "scaleXY",
  //     duration: 1000
  //   },
  //   update: {
  //     type: "spring",
  //     springDamping: 0.5,
  //     property: "scaleXY",
  //     duration: 1000
  //   },
  //   delete: {
  //     type: "spring",
  //     springDamping: 0.5,
  //     property: "scaleXY",
  //     duration: 1000
  //   }
  // };
  // bolup = () => {
  //   LayoutAnimation.configureNext(this.configlayouts);
  //   this.setState(prev => ({ showHeader: !prev.showHeader }));
  // };
  // onScroller(event) {
  //   Animated.event([
  //     ({ nativeEvent }) => {
  //       this.setState({ scrollX: nativeEvent.contentOffset.x });
  //     },
  //     console.warn("hello")
  //   ])(event);
  // }

  // logger(){
  //   setInterval(console.warn('second'),2000)
  // }


  fadeIn=()=>{
    Animated.timing(this.state.myopacity,{toValue:1,duration:500,useNativeDriver:true}).start()
  }
  componentDidMount() {
    this.fadeIn();
  }

  render() {
    let scrollIndicator = Data;
    // let position = Animated.divide(this.state.scrollX , deviceWidth);
    let positionIndex = Math.round(this.state.scrollX/deviceWidth) || 0 ;
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

// Data.map(()=>{return()})
//     const opacityY = position.interpolate({
//       inputRange:[index-1,index,index+1],
//       outputRange:[0.5,1,0.5],
//       extrapolate:'clamp'
//     }),

let D = new Date(500)


let {getopacity} = this.state.upOpacity

    return (
      <View style={styles.container}>
        {/* <ScrollView
          scrollEventThrottle={10}
          // onScroll={({ nativeEvent }) => {
          //   this.setState({ scrollY: nativeEvent.contentOffset.y }, () => {
          //     this.bolup();
          //   });
          // }}
          pagingEnabled
        > */}
        {/* <ScrollView pagingEnabled horizontal>

          <View
                style={{
                  position: "absolute",
                  zIndex: 6,
                  backgroundColor: "rgba(100,100,200,0.5)",
                  borderRadius: 50,
                  top: 200,
                  left: 200
                }}
              >
                <Text
                  style={{ color: "#fff" , position: "absolute",
                  zIndex: 6,
                  backgroundColor: "rgba(100,100,200,0.5)",
                  borderRadius: 50,
                  top: 200,
                  left: 200}}
                  onPress={this.showmenu.bind(this)}
                >
                  hello
                </Text>
              </View> */}

        {/* {this.state.showNav &&
              <Animated.View
                style={{
                  borderColor: "gold",
                  borderWidth: 4,
                  borderRadius: 6,
                  width: deviceWidth * (50 / 100),
                  height: deviceHeight,
                  backgroundColor: "royalblue",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    zIndex: 6,
                    backgroundColor: "black",
                    borderRadius: 50,
                    top: 200,
                    left: 200
                  }}
                >
                  <Text
                    style={{ color: "#fff" }}
                    onPress={this.showmenu.bind(this)}
                  >
                    hello
                  </Text>
                </View>
              </Animated.View>
            } */}

        {/* <Animated.View>
              <Animated.View
                style={{
                  borderColor: "gold",
                  borderWidth: 4,
                  borderRadius: 6,
                  width: deviceWidth,
                  height: deviceHeight,
                  backgroundColor: "#333",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Animated.View
                  style={{
                    borderColor: "dodgerblue",
                    borderWidth: 4,
                    borderRadius: 6,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Animated.Text
                    style={{ fontFamily: "serif", color: "#fff", fontSize: 30 }}
                  >
                    WELCOME TO GRAND HALL OF HISTORICAL CORVETTES
                  </Animated.Text>
                </Animated.View>
              </Animated.View>
            </Animated.View> */}

        <Animated.View style={styles.flatlistContainer}>
          <FlatList
            data={Data}
            // ListHeaderComponent={this.flatlistHeader}
            horizontal
            pagingEnabled
            // scrollEventThrottle={-100}
            decelerationRate={0.5}
            // onScroll={Animated.event([({ nativeEvent }) => {this.setState({ scrollX: nativeEvent.contentOffset.x }); } ,console.warn('hello') ])(event)}

            // onScroll={this.onScroller.bind(this)}
            // onMomentumScrollBegin={console.warn('hello')}
            onScroll={({ nativeEvent }) => {
              // var dd = new Date
              // var n = dd.getMilliseconds();
              // console.warn(n)
              // var gg
              // var ddd = setTimeout(()=>{gg = Math.floor(nativeEvent.contentOffset.x);console.warn(`this is later${Math.floor(nativeEvent.contentOffset.x)}`)},50)
              // // var ddd = setTimeout(()=>{this.calpos},50)
              // console.warn(`this is gg : ${gg}`)
              // // this.calpos
              // let aa = 0
                

                
              this.setState({ scrollX: nativeEvent.contentOffset.x }, )

              let aa = nativeEvent.contentOffset.x
              // var dd =Math.floor(nativeEvent.contentOffset.x) 
              //   console.warn(`this is now ${dd}:`)
              console.warn(` this is scrollX ${this.state.scrollX}  == this is previous ${aa}`)
if(this.state.scrollX === aa){console.warn(`${this.state.scrollX}  == ${aa}`)}



              this.setState({ScrollNow:Math.floor(nativeEvent.contentOffset.x)})
                // console.warn(`this is now ${dd} : this is later ${ddd}`)
                // console.warn(`this is now ${this.state.ScrollNow}`)

                setTimeout(()=>{this.setState({ScrollState:Math.floor(nativeEvent.contentOffset.x)})},1500)
              //  console.warn(`this is cc ${this.state.ScrollState}`)
                if(this.state.ScrollState === this.state.ScrollNow){
                  console.warn(` true ${this.state.ScrollState} === ${this.state.ScrollNow}`)
                  this.setState({isShowingName:true},()=>{this.fadeIn()})
                }else{
                  // this.state.myopacity.setValue(0)
                  this.setState({isShowingName:false})
                  console.warn(` false ${this.state.ScrollState} === ${this.state.ScrollNow}`)

                }
               
              //   calpos=()=>{
              // setTimeout(()=>{console.warn(`this is later${Math.floor(nativeEvent.contentOffset.x)}`)},500)
                  // if(dd === ){console.warn('hello')}
              //   }
              // var nw = Date.now();
             
              // if(true){console.warn(`${nativeEvent.contentOffset.x}  ,  ${dd}`)}
              // if(nativeEvent.contentOffset.x.onchange){console.warn(nativeEvent.contentOffset.x)}
              // if(nativeEvent.contentOffset.x.onChange){setTimeout(()=>console.warn('stoped'),500)}
              // console.warn(nativeEvent.contentOffset.x)
              // var isChangedScroll = nativeEvent.contentOffset.x;
              // if(nativeEvent === isChangedScroll){alert('hello changed')}



              // this.setState({isShowingName:false})
              
              // Animated.timing(this.state.upOpacity,{toValue:0,duration:50,useNativeDriver:true}).start()
              
               
            
            // Animated.event([
            //   { nativeEvent: { contentOffset: { x: this.state.scrollX } } }
            

            //   // this.setState({ scrollX: nativeEvent.contentOffset.x }, () => {
            //   //   this.logger(console.warn('first one'));
            //   // });
            }}
            // onScroll={ Animated.event([({ nativeEvent }) => {
            //   this.setState({ scrollX: nativeEvent.contentOffset.x });
            // },])     }

            // onScroll={Animated.event([
            //   (({ nativeEvent }) => {
            //       this.setState({ scrollX: nativeEvent.contentOffset.x });
            //     })])}

            keyExtractor={item => item.key}
            renderItem={({ item ,index}) => {
              return (
                <Animated.View key={item} style={styles.flatlistPage}>
                  <View style={styles.pageHeader}>
                    {/* {this.state.showHeader && (
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 18,
                            fontWeight: "600"
                          }}
                        >
                          Timeline
                        </Text>
                      )} */}
                  </View>
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
                          const opacityX = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [0.3, 1, 0],
                            extrapolate: "extend"
                            // duration: 400
                          });
                          const fontSizer = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [25, 50, 25]
                          });
                          const topPadder = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [10, 20, 0]
                          });

                          return (
                            <Animated.View
                              key={i}
                              style={{
                                opacityX,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 50,
                                transform: [{ scaleY: 1.25 }]
                              }}
                            >
                              <Animated.Text
                                style={{
                                  opacity: opacityX,
                                  color: "#fff",
                                  // fontSize: fontSizer,
                                  fontWeight: "800",
                                  fontFamily: "monospace",
                                  // paddingTop: topPadder || 1,
                                  // trensform: this.state.upMove,
                                  // transform: [{ translateY: topPadder }],
                                  // marginRight: marginRighter,
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

        

<View style={{flexDirection: 'row',}}>


                     {this.state.isShowingName && <Animated.View
                          style={[
                            styles.carName,
                           

                            {
                              // paddingBottom: marginToper,
                             
                              
                               opacity :position.interpolate({
                                inputRange:[index-1,index,index+1],
                                useNativeDriver:true,
                                outputRange:[0,1,0],
                                duration:5000,
                                extrapolate:'clamp'
                               }),
                              // opacity:this.state.myopacity,
                              height:100,
                              
                              // transform:[{translateX:this.state.Xtransform}],
                              // opacity: this.state.upOpacity
                            }
                          ]}
                        >
                          <Animated.Text style={[styles.nameTxt,{ color:'#fff',fontSize:12}]}>
                            {item.build}
                          </Animated.Text>
                          <Animated.Text style={[styles.nameTxt,{ color:'#fff',fontSize:12}]}>
                            {item.name}
                          </Animated.Text>
                        </Animated.View>}
                        </View>
                        {/* {console.warn(`this is posindex ${positionIndex}`)}
                        {console.warn(`this is index ${index}`)} */}
                        {/* <Animated.View style={{flexDirection: 'row',}}>
                        {Data.map((desItem, desIndex) => {
                          const opacityRem = position.interpolate({
                            inputRange: [desIndex - 1, desIndex, desIndex + 1],
                            outputRange: [0, 1, 0],
                            extrapolate: "clamp"
                          });
                          const fontier = position.interpolate({
                            inputRange: [desIndex - 1, desIndex, desIndex + 1],
                            outputRange: [0.5, 1, 0.5],
                            extrapolate: "clamp"
                          })
                          return (
                            <Animated.View style={{backgroundColor:'lime',flexDirection: 'row',opacity:opacityRem}}>
                              <Animated.Text style={styles.nameTxt}>
                                {desItem.build}
                              </Animated.Text>
                              <Animated.Text style={styles.nameTxt}>
                                {desItem.name}
                              </Animated.Text>
                            </Animated.View>
                          );
                        })}
                        </Animated.View> */}

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
                            <Text
                              style={{
                                borderWidth: 2,
                                borderColor: "dodgerblue"
                              }}
                            >
                              {item.description}
                            </Text>
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
        <Animated.View>
          <Animated.View
            style={{
              borderColor: "gold",
              borderWidth: 4,
              borderRadius: 6,
              width: deviceWidth,
              height: deviceHeight,
              backgroundColor: "#333",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Animated.View
              style={{
                borderColor: "dodgerblue",
                borderWidth: 4,
                borderRadius: 6,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={require("../Assets/Images/chevrolet.png")}
                style={{ width: 300, height: 200 }}
              />
            </Animated.View>
          </Animated.View>
        </Animated.View>
        {/* </ScrollView> */}
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
    flexDirection: "row"
    // flex:1
  },
  ProductHistory: {
    fontSize: 14,
    color: "#eee",
    borderColor: "red",
    borderWidth: 3
  },
  productionView: {
    backgroundColor: "purple",
    borderWidth: 3,
    flex: 1
  },
  decsiptionView: {
    backgroundColor: "gold",
    borderWidth: 3,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row"
  }
});
