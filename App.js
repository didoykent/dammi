/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Card,
  CardItem,
  Thumbnail,
  TouchableOpacity,
  Button,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import { PacmanIndicator } from 'react-native-indicators';
import { Col, Row, Grid } from "react-native-easy-grid";


import axios from 'axios'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phpRate: null,
      phpSellRate: null,
      krwRate: null,
      currentKoreanRate: null,
      rate: null,
      hasLoadedData: false,
      binanceRate:null,
      upbitRate: null,
      binanceEth:null,
      upbitEth:null,
      usdkrRate: null


    }
    this.coinsPh = this.coinsPh.bind(this)
    this.conversion = this.conversion.bind(this)
    this.hasLoaded = this.hasLoaded.bind(this)
    this.getCPDAXRate = this.getCPDAXRate.bind(this)
    this.getCoinsSellRate = this.getCoinsSellRate.bind(this)
    this.binance = this.binance.bind(this)
    this.getBURate = this.getBURate.bind(this)
    this.getSURate = this.getSURate.bind(this)


  }

  componentWillMount() {
    setInterval(this.coinsPh, 1000)
    setInterval(this.conversion, 1000)
    setInterval(this.binance, 1000)

  }

  hasLoaded() {
    const vm = this
    const { currentKoreanRate, phpRate, phpSellRate, binanceRate, upbitRate, binanceEth, upbitEth, usdkrRate } = vm.state
    const hasData = currentKoreanRate !== null  && phpRate !== null && phpSellRate !== null && binanceRate !== null  && upbitRate !== null && usdkrRate !==null && binanceEth !==null && upbitEth !==null
    return hasData
  }

  async coinsPh() {
    var vm = this
    try {
      const result = await axios.get('https://quote.coins.ph/v1/markets/BTC-PHP')
      const { ask, bid } = result.data.market
      vm.setState({ phpRate: ask, phpSellRate: bid })
    } catch (e) {
    }
  }

  async binance(){


var vm = this

try{
const result = await axios.get('https://rocky-atoll-77281.herokuapp.com/api/binanceCoinRate')
const{binanceCoinRate, upbitCoinRate, usdTokrw, binanceEthRate, upbitEthRate} = result.data
vm.setState({binanceRate: binanceCoinRate, upbitRate: upbitCoinRate, binanceEth: binanceEthRate, upbitEth: upbitEthRate, usdkrRate: usdTokrw })

}catch(e){


}

  }

  async conversion() {
    var vm = this
    try {
      const result = await axios.get('https://api.fixer.io/latest?base=PHP')
      const convertRate = result.data.rates.KRW
      vm.setState({ currentKoreanRate: convertRate })
    } catch (e) {
    }
  }
  async coinsPlug() {
    var vm = this
    try {
      const result = await axios.get('https://www.coinplug.com/web/open/spot_rate?_=1517362388888')
      const koreanCoin = result.data.data

      vm.setState({ krwRate: koreanCoin })
    } catch (e) {
    }
  }

  getCPDAXRate() {
    const vm = this
    const { currentKoreanRate, phpRate, upbitRate } = vm.state
    const result = (upbitRate - (currentKoreanRate * phpRate)) / (phpRate * currentKoreanRate) * 100
    return result.toFixed(2)
  }

  getCoinsSellRate() {
    const vm = this
    const { currentKoreanRate, phpSellRate, upbitRate } = vm.state
    const result = (((phpSellRate * currentKoreanRate) - upbitRate) / upbitRate) * 100
    return result.toFixed(2)
  }

  getBURate(){
    const vm = this
    const {usdkrRate, binanceRate, upbitRate } = vm.state
    const result = ( upbitRate - (binanceRate * usdkrRate)) / (binanceRate * usdkrRate) * 100
    return result.toFixed(2)

  }

  getSURate(){

    const vm = this
    const {usdkrRate, binanceRate, upbitRate } = vm.state
    const result = (((usdkrRate * binanceRate) - upbitRate) / upbitRate) * 100
    return result.toFixed(2)
  }

  getBUEthRate(){
    const vm = this
    const {usdkrRate, binanceEth, upbitEth } = vm.state
    const result = ( upbitEth - (binanceEth * usdkrRate)) / (binanceEth * usdkrRate) * 100
    return result.toFixed(2)

  }

  getSUEthRate(){

    const vm = this
    const {usdkrRate, binanceEth, upbitEth } = vm.state
    const result = (((usdkrRate * binanceEth) - upbitEth) / upbitEth) * 100
    return result.toFixed(2)
  }



  render() {
    const vm = this
    const { phpRate, phpSellRate, currentKoreanRate, hasLoadedData, binanceRate , upbitRate, upbitEth, binanceEth, usdkrRate} = vm.state
    const styles = StyleSheet.create({
      content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      labelText: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
      },
      title: {
        fontSize: 25,
        color: 'white',
      },
      valueText: {
        fontSize: 20,
        backgroundColor: 'grey',
        width: 150,
        textAlign: 'center',
        borderRadius: 10,
        padding: 8,
        color: 'white',
      },
      labelValueContainer: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
      },
      alignLeft: {
        alignItems: 'flex-start',
        marginLeft: 15,
      },
      alimRight: {
        alignItems: 'flex-end',
      },

      navBar: {
    height: 50,

    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'space-between',

    elevation: 3,
    paddingHorizontal: 15,
    flexDirection: 'row',

  },
  container: {

    flex: 1
  },

  body:{

    flex: 1
  },
  dateFont:{
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',

  }





    });
    if (!vm.hasLoaded()) {
      return <View style={{ height: '100%', flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center' }}>
        <Image source={require('./backgrounds.jpg')} style={{ resizeMode: 'cover', width: '100%', height: '100%', position: 'absolute' }} />
        <PacmanIndicator size={100} color="#FFECB3" />
        </View>
    }
    return (
      <View style = {styles.container}>


    <View style = {styles.navBar}>

<Text style = {styles.dateFont}>  {new Date().toLocaleString("en-US", {timeZone: "Asia/Seoul"})}</Text>
    </View>

    <View style = {styles.body}>

        <Image source={require('./backgrounds.jpg')} style={{ resizeMode: 'cover', width: '100%', height: '100%', position: 'absolute' }} />



        <ScrollView>

          <Grid>


            <Row style>
              <Col>
                <View style={styles.labelValueContainer}>
                  <Row style = {{marginBottom:10}}>
                    <Col style={styles.alignLeft}>
                      <Text style={styles.labelText}>Coins.ph | Buy</Text>
                    </Col>
                    <Col style={styles.alignRight}>
                      <Text style={styles.valueText}>{phpRate}</Text>
                    </Col>
                  </Row>

                </View>
              </Col>
            </Row>
             <Row>
              <Col>
                <View style={styles.labelValueContainer}>
                  <Row style = {{marginBottom:10}}>
                    <Col style={styles.alignLeft}>
                      <Text style={styles.labelText}>PHP to KRW</Text>
                    </Col>
                    <Col style={styles.alignRight}>
                      <Text style={styles.valueText}>{currentKoreanRate} KRW</Text>
                    </Col>
                  </Row>


                </View>
              </Col>
            </Row>
            <Row>
              <Col>
                <View style={styles.labelValueContainer}>
                  <Row style={{ marginBottom: 10 }}>
                    <Col style={styles.alignLeft}>
                      <Text style={styles.labelText}>Upbit </Text>
                    </Col>
                    <Col style={styles.alignRight}>
                      <Text style={styles.valueText}>{upbitRate}</Text>
                    </Col>
                  </Row>
                  <Row style = {{marginBottom: 10}}>
                    <Col style={styles.alignLeft}>
                      <Text style={styles.labelText}>Rate</Text>
                    </Col>
                    <Col style={styles.alignRight}>
                      <Text style={styles.valueText}>{this.getCPDAXRate()}%</Text>
                    </Col>
                  </Row>


                </View>
              </Col>
            </Row>
            <Row>
              <Col>
                <View style={styles.labelValueContainer}>
                  <Row style={{ marginBottom: 10 }}>
                    <Col style={styles.alignLeft}>
                      <Text style={styles.labelText}>Coins.ph | Sell </Text>
                    </Col>
                    <Col style={styles.alignRight}>
                      <Text style={styles.valueText}> {phpSellRate}</Text>
                    </Col>
                  </Row>
                  <Row style= {{marginBottom: 10}}>
                    <Col style={styles.alignLeft}>
                      <Text style={styles.labelText}>Rate </Text>
                    </Col>
                    <Col style={styles.alignRight}>
                      <Text style={styles.valueText}>{this.getCoinsSellRate()}%</Text>
                    </Col>
                  </Row>

                </View>
              </Col>
            </Row>



            <Row>
              <Col>
                <View style={styles.labelValueContainer}>
                  <Row style = {{marginBottom: 10}}>
                    <Col style={styles.alignLeft}>
                      <Text style={styles.labelText}>Binance | Buy | Sell</Text>
                    </Col>
                    <Col style={styles.alignRight}>
                      <Text style={styles.valueText}>{binanceRate}</Text>
                    </Col>
                  </Row>
                  <Row style= {{marginBottom: 10}}>
                    <Col style={styles.alignLeft}>
                      <Text style={styles.labelText}>Rate </Text>
                    </Col>
                    <Col style={styles.alignRight}>
                      <Text style={styles.valueText}>{this.getBURate()}%</Text>
                    </Col>
                  </Row>

                </View>
              </Col>
            </Row>


             <Row>
              <Col>
                <View style={styles.labelValueContainer}>
                  <Row style = {{marginBottom: 10}}>
                    <Col style={styles.alignLeft}>
                      <Text style={styles.labelText}>USD to KRW</Text>
                    </Col>
                    <Col style={styles.alignRight}>
                      <Text style={styles.valueText}>{usdkrRate} KRW</Text>
                    </Col>
                  </Row>

                </View>
              </Col>
            </Row>


            <Row>
              <Col>
                <View style={styles.labelValueContainer}>
                  <Row style={{ marginBottom: 10 }}>
                    <Col style={styles.alignLeft}>
                      <Text style={styles.labelText}>Upbit | Sell | Buy</Text>
                    </Col>
                    <Col style={styles.alignRight}>
                      <Text style={styles.valueText}> {upbitRate}</Text>
                    </Col>
                  </Row>
                  <Row style = {{marginBottom: 10}}>
                    <Col style={styles.alignLeft}>
                      <Text style={styles.labelText}>Rate </Text>
                    </Col>
                    <Col style={styles.alignRight}>
                      <Text style={styles.valueText}>{this.getSURate()}%</Text>
                    </Col>
                  </Row>
                </View>
              </Col>
            </Row>


            <Row>
<Col>
<View>




  <Row style={{ marginBottom: 10 }}>
    <Col>
      <Text style={{  fontSize: 25,
        color: 'white',
        fontWeight: 'bold', textAlign: 'center', marginRight: 15}}>Ethereum</Text>

        <Col style={{
          borderBottomWidth: 5,
          borderBottomColor: 'white',
          width: 400
        }}>

        </Col>
    </Col>

  </Row>

</View>
</Col>

            </Row>



            <Row>
              <Col>
                <View style={styles.labelValueContainer}>
                  <Row style = {{marginBottom: 10}}>
                    <Col style={styles.alignLeft}>
                      <Text style={styles.labelText}>Binance | Buy | Sell</Text>
                    </Col>
                    <Col style={styles.alignRight}>
                      <Text style={styles.valueText}>{binanceEth}</Text>
                    </Col>
                  </Row>
                  <Row style= {{marginBottom: 10}}>
                    <Col style={styles.alignLeft}>
                      <Text style={styles.labelText}>Rate </Text>
                    </Col>
                    <Col style={styles.alignRight}>
                      <Text style={styles.valueText}>{this.getBUEthRate()}%</Text>
                    </Col>
                  </Row>

                </View>
              </Col>
            </Row>


             <Row>
              <Col>
                <View style={styles.labelValueContainer}>
                  <Row style = {{marginBottom: 10}}>
                    <Col style={styles.alignLeft}>
                      <Text style={styles.labelText}>USD to KRW</Text>
                    </Col>
                    <Col style={styles.alignRight}>
                      <Text style={styles.valueText}>{usdkrRate} KRW</Text>
                    </Col>
                  </Row>

                </View>
              </Col>
            </Row>


            <Row>
              <Col>
                <View style={styles.labelValueContainer}>
                  <Row style={{ marginBottom: 10 }}>
                    <Col style={styles.alignLeft}>
                      <Text style={styles.labelText}>Upbit | Sell | Buy</Text>
                    </Col>
                    <Col style={styles.alignRight}>
                      <Text style={styles.valueText}>{upbitEth}</Text>
                    </Col>
                  </Row>
                  <Row style = {{marginBottom: 10}}>
                    <Col style={styles.alignLeft}>
                      <Text style={styles.labelText}>Rate </Text>
                    </Col>
                    <Col style={styles.alignRight}>
                      <Text style={styles.valueText}>{this.getSUEthRate()}%</Text>
                    </Col>
                  </Row>
                </View>
              </Col>
            </Row>




      </Grid>
        </ScrollView>

      </View>
      </View>
    )
  }
}
