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
      usdkrRate: null,

    }
    this.coinsPh = this.coinsPh.bind(this)
    this.coinsPlug = this.coinsPlug.bind(this)
    this.conversion = this.conversion.bind(this)
    this.hasLoaded = this.hasLoaded.bind(this)
    this.getCPDAXRate = this.getCPDAXRate.bind(this)
    this.getCoinsSellRate = this.getCoinsSellRate.bind(this)
    this.binance = this.binance.bind(this)
    this.getBURate = this.getBURate.bind(this)
  }

  componentWillMount() {
    setInterval(this.coinsPh, 1000)
    setInterval(this.coinsPlug, 1000)
    setInterval(this.conversion, 1000)
  this.binance()
  }

  hasLoaded() {
    const vm = this
    const { currentKoreanRate, krwRate, phpRate, phpSellRate, binanceRate, upbitRate, usdkrRate } = vm.state
    const hasData = currentKoreanRate !== null && krwRate !== null && phpRate !== null && phpSellRate !== null && binanceRate !== null  && upbitRate !== null && usdkrRate !==null
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
const{binanceCoinRate, upbitCoinRate, usdTokrw} = result.data
vm.setState({binanceRate: binanceCoinRate, upbitRate: upbitCoinRate, usdkrRate: usdTokrw })

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
    const { currentKoreanRate, phpRate, krwRate } = vm.state
    const result = (krwRate - (currentKoreanRate * phpRate)) / phpRate * currentKoreanRate
    return result.toFixed(2)
  }

  getCoinsSellRate() {
    const vm = this
    const { currentKoreanRate, phpSellRate, krwRate } = vm.state
    const result = ((phpSellRate * currentKoreanRate) - krwRate) / krwRate
    return result.toFixed(2)
  }

  getBURate(){
    const vm = this
    const {usdkrRate, binanceRate, upbitRate } = vm.state
    const result = (  (binanceRate * usdkrRate)  - upbitRate   ) / upbitRate * 100 
    return result.toFixed(2)

  }

  render() {
    const vm = this
    const { phpRate, phpSellRate, krwRate, currentKoreanRate, hasLoadedData, binanceRate , upbitRate, usdkrRate} = vm.state
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
      }
    });
    if (!vm.hasLoaded()) {
      return <View style={{ height: '100%', flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center' }}>
        <Image source={require('./backgrounds.jpg')} style={{ resizeMode: 'cover', width: '100%', height: '100%', position: 'absolute' }} />
        <PacmanIndicator size={100} color="#FFECB3" />
        </View>
    }
    return (
      <View style={{ height: '100%', flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center' }}>
        <Image source={require('./backgrounds.jpg')} style={{ resizeMode: 'cover', width: '100%', height: '100%', position: 'absolute' }} />
        <ScrollView>
          <Grid>
            <Row>
              <Col>
                <View style={styles.labelValueContainer}>
                  <Row>
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
                  <Row>
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
                      <Text style={styles.labelText}>CPDAX</Text>
                    </Col>
                    <Col style={styles.alignRight}>
                      <Text style={styles.valueText}>{krwRate}</Text>
                    </Col>
                  </Row>
                  <Row>
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
                      <Text style={styles.labelText}>Coins.ph | Sell</Text>
                    </Col>
                    <Col style={styles.alignRight}>
                      <Text style={styles.valueText}> {phpSellRate}</Text>
                    </Col>
                  </Row>
                  <Row>
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
                  <Row>
                    <Col style={styles.alignLeft}>
                      <Text style={styles.labelText}>Binance | Buy</Text>
                    </Col>
                    <Col style={styles.alignRight}>
                      <Text style={styles.valueText}>{binanceRate}</Text>
                    </Col>
                  </Row>
                </View>
              </Col>
            </Row>


             <Row>
              <Col>
                <View style={styles.labelValueContainer}>
                  <Row>
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
                      <Text style={styles.labelText}>Upbit | Buy</Text>
                    </Col>
                    <Col style={styles.alignRight}>
                      <Text style={styles.valueText}> {upbitRate}</Text>
                    </Col>
                  </Row>
                  <Row>
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



          </Grid>
        </ScrollView>
      </View>
    )
  }
}
