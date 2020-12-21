/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  StatusBar,
  FlatList,
  View,
  Dimensions,
  Animated,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {
  FlingGestureHandler,
  Directions,
  State,
  RectButton,
} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

import Text from '../../components/text';
import Card from '../../components/card';
import Image from '../../components/image';
import Loader from '../../components/loader';

import LinkModal from './LinkModal';

const {width: viewportWidth} = Dimensions.get('window');

const ITEM_WIDTH = viewportWidth * 0.9;
const VISIBLE_ITEMS = 3;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textMargin: {
    marginBottom: 4,
  },

  margin10: {
    margin: 10,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  location: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
  itemContainer: {
    marginHorizontal: 0,
    marginVertical: 0,
    flex: 1,
    minHeight: 200,
  },
  itemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const HomeScreen = () => {
  const [headlines, setHeadlines] = useState({
    status: 'ok',
    totalResults: 38,
    articles: [
      {
        source: {
          id: null,
          name: 'CBS Sports',
        },
        author: 'Brent Brookhouse',
        title:
          '2020 WWE TLC results, recap, grades: Bizarre Firefly Inferno match closes final PPV event of 2020 - CBSSports.com',
        description:
          "Randy Orton and 'The Fiend' Bray Wyatt delivered a wild main event inside the ThunderDome on Sunday night",
        url:
          'https://www.cbssports.com/wwe/news/2020-wwe-tlc-results-recap-grades-bizarre-firefly-inferno-match-closes-final-ppv-event-of-2020/live/',
        urlToImage:
          'https://sportshub.cbsistatic.com/i/r/2020/12/21/8a26a8f6-ad47-41cb-aef9-5a83c4c0a329/thumbnail/1200x675/63f96eaf709b63cdd87194e64be31e1a/orton.jpg',
        publishedAt: '2020-12-21T03:16:00Z',
        content:
          'WWE fans who thought crazy pay-per-view stunts in 2020 peaked with Rey Mysterio having his eye removed in a match with Seth Rollins clearly did not count on the final PPV of the year featuring Randy … [+11184 chars]',
      },
      {
        source: {
          id: 'usa-today',
          name: 'USA Today',
        },
        author: 'Jessica Menton',
        title:
          'COVID-19 relief package: $600 stimulus checks, $300 bonus for federal unemployment benefits in new deal - USA TODAY',
        description:
          "Lawmakers struck a nearly $900B COVID-19 stimulus deal Sunday that would deliver badly needed aid to millions. Here's what is in the package.",
        url:
          'https://www.usatoday.com/story/money/2020/12/20/stimulus-checks-unemployment-benefits-economy-covid-relief-package/3921356001/',
        urlToImage:
          'https://www.gannett-cdn.com/-mm-/9e1f6e2ee20f44aa1f3be4f71e9f3e52b6ae2c7e/c=0-110-2121-1303/local/-/media/2020/11/16/USATODAY/usatsports/stimulus-check-billsoriginal.jpg?width=1600&height=800&fit=crop',
        publishedAt: '2020-12-21T03:00:00Z',
        content:
          "Job loss numbers skyrocketed during the COVID-19 pandemic, but not everyone was counted as unemployed. Here's how the unemployment rate is measured.\r\nUSA TODAY\r\nLawmakers struck a nearly $900 billion… [+5137 chars]",
      },
      {
        source: {
          id: 'fox-news',
          name: 'Fox News',
        },
        author: 'Associated Press',
        title:
          'Concern among Muslims over halal status of COVID-19 vaccine - Fox News',
        description:
          'As companies race to develop a COVID-19 vaccine and countries scramble to secure doses, questions about the use of pork products — banned by some religious groups — has raised concerns about the possibility of disrupted immunization campaigns.',
        url:
          'https://www.foxnews.com/world/concern-among-muslims-over-halal-status-of-covid-19-vaccine',
        urlToImage:
          'https://static.foxnews.com/foxnews.com/content/uploads/2020/12/AP20351314311045.jpg',
        publishedAt: '2020-12-21T02:56:10Z',
        content:
          'JAKARTA, Indonesia In October, Indonesian diplomats and Muslim clerics stepped off a plane in China. While the diplomats were there to finalize deals to ensure millions of doses reached Indonesian ci… [+7528 chars]',
      },
      {
        source: {
          id: 'fox-news',
          name: 'Fox News',
        },
        author: 'Associated Press',
        title:
          'Concern among Muslims over halal status of COVID-19 vaccine - Fox News',
        description:
          'As companies race to develop a COVID-19 vaccine and countries scramble to secure doses, questions about the use of pork products — banned by some religious groups — has raised concerns about the possibility of disrupted immunization campaigns.',
        url:
          'https://www.foxnews.com/world/concern-among-muslims-over-halal-status-of-covid-19-vaccine',
        urlToImage:
          'https://static.foxnews.com/foxnews.com/content/uploads/2020/12/AP20351314311045.jpg',
        publishedAt: '2020-12-21T02:56:10Z',
        content:
          'JAKARTA, Indonesia In October, Indonesian diplomats and Muslim clerics stepped off a plane in China. While the diplomats were there to finalize deals to ensure millions of doses reached Indonesian ci… [+7528 chars]',
      },
    ],
  });
  const [articles, setArticles] = useState({
    status: 'ok',
    totalResults: 38,
    articles: [
      {
        source: {
          id: null,
          name: 'CBS Sports',
        },
        author: 'Brent Brookhouse',
        title:
          '2020 WWE TLC results, recap, grades: Bizarre Firefly Inferno match closes final PPV event of 2020 - CBSSports.com',
        description:
          "Randy Orton and 'The Fiend' Bray Wyatt delivered a wild main event inside the ThunderDome on Sunday night",
        url:
          'https://www.cbssports.com/wwe/news/2020-wwe-tlc-results-recap-grades-bizarre-firefly-inferno-match-closes-final-ppv-event-of-2020/live/',
        urlToImage:
          'https://sportshub.cbsistatic.com/i/r/2020/12/21/8a26a8f6-ad47-41cb-aef9-5a83c4c0a329/thumbnail/1200x675/63f96eaf709b63cdd87194e64be31e1a/orton.jpg',
        publishedAt: '2020-12-21T03:16:00Z',
        content:
          'WWE fans who thought crazy pay-per-view stunts in 2020 peaked with Rey Mysterio having his eye removed in a match with Seth Rollins clearly did not count on the final PPV of the year featuring Randy … [+11184 chars]',
      },
      {
        source: {
          id: 'usa-today',
          name: 'USA Today',
        },
        author: 'Jessica Menton',
        title:
          'COVID-19 relief package: $600 stimulus checks, $300 bonus for federal unemployment benefits in new deal - USA TODAY',
        description:
          "Lawmakers struck a nearly $900B COVID-19 stimulus deal Sunday that would deliver badly needed aid to millions. Here's what is in the package.",
        url:
          'https://www.usatoday.com/story/money/2020/12/20/stimulus-checks-unemployment-benefits-economy-covid-relief-package/3921356001/',
        urlToImage:
          'https://www.gannett-cdn.com/-mm-/9e1f6e2ee20f44aa1f3be4f71e9f3e52b6ae2c7e/c=0-110-2121-1303/local/-/media/2020/11/16/USATODAY/usatsports/stimulus-check-billsoriginal.jpg?width=1600&height=800&fit=crop',
        publishedAt: '2020-12-21T03:00:00Z',
        content:
          "Job loss numbers skyrocketed during the COVID-19 pandemic, but not everyone was counted as unemployed. Here's how the unemployment rate is measured.\r\nUSA TODAY\r\nLawmakers struck a nearly $900 billion… [+5137 chars]",
      },
      {
        source: {
          id: 'fox-news',
          name: 'Fox News',
        },
        author: 'Associated Press',
        title:
          'Concern among Muslims over halal status of COVID-19 vaccine - Fox News',
        description:
          'As companies race to develop a COVID-19 vaccine and countries scramble to secure doses, questions about the use of pork products — banned by some religious groups — has raised concerns about the possibility of disrupted immunization campaigns.',
        url:
          'https://www.foxnews.com/world/concern-among-muslims-over-halal-status-of-covid-19-vaccine',
        urlToImage:
          'https://static.foxnews.com/foxnews.com/content/uploads/2020/12/AP20351314311045.jpg',
        publishedAt: '2020-12-21T02:56:10Z',
        content:
          'JAKARTA, Indonesia In October, Indonesian diplomats and Muslim clerics stepped off a plane in China. While the diplomats were there to finalize deals to ensure millions of doses reached Indonesian ci… [+7528 chars]',
      },
      {
        source: {
          id: 'fox-news',
          name: 'Fox News',
        },
        author: 'Associated Press',
        title:
          'Concern among Muslims over halal status of COVID-19 vaccine - Fox News',
        description:
          'As companies race to develop a COVID-19 vaccine and countries scramble to secure doses, questions about the use of pork products — banned by some religious groups — has raised concerns about the possibility of disrupted immunization campaigns.',
        url:
          'https://www.foxnews.com/world/concern-among-muslims-over-halal-status-of-covid-19-vaccine',
        urlToImage:
          'https://static.foxnews.com/foxnews.com/content/uploads/2020/12/AP20351314311045.jpg',
        publishedAt: '2020-12-21T02:56:10Z',
        content:
          'JAKARTA, Indonesia In October, Indonesian diplomats and Muslim clerics stepped off a plane in China. While the diplomats were there to finalize deals to ensure millions of doses reached Indonesian ci… [+7528 chars]',
      },
    ],
  });

  const [apiError, setApiError] = useState();
  const [linkModal, setLinkModal] = useState('');
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setActiveIndex = React.useCallback((activeIndex) => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  });

  useEffect(() => {
    const getNews = async () => {
      try {
        const response = await axios.get(
          'http://newsapi.org/v2/top-headlines',
          {
            params: {
              country: 'in',
              pageSize: 10,
            },
            headers: {
              'X-Api-Key': '01d9ca07e3964485bed6025f361b7e7e',
            },
          },
        );

        let sources = [];
        for (let i = 0; i < response.data.articles.length; i++) {
          const id = response.data.articles[i].source.id;
          id && !sources.includes(id) && sources.push(id);
        }
        // response.data.status === 'ok' && setHeadlines(response.data);
        const responseAll = await axios.get(
          'http://newsapi.org/v2/everything',
          {
            params: {
              sources: sources,
              pageSize: 100,
            },
            headers: {
              'X-Api-Key': '01d9ca07e3964485bed6025f361b7e7e',
            },
          },
        );
        responseAll.data.status === 'ok' && setArticles(responseAll.data);
        apiError && setApiError();
      } catch (error) {
        if (error.response) {
          console.log('Response Error', error.response);
          error.response.data && setApiError(error.response.data.message);
        } else if (error.request) {
          console.log('Request Error', error.request);
        } else {
          console.log('Config Error', error.message);
        }
      }
    };
    getNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  const closeModal = () => {
    setLinkModal('');
  };

  const renderArticle = ({item}) => {
    const {source, title, description, url, urlToImage, publishedAt} = item;
    const date1 = Date.now();
    const date2 = publishedAt && Date.parse(publishedAt);
    const diffTime = Math.abs(date2 - date1);
    const diffHours = diffTime / (1000 * 60 * 60);
    return (
      <Card>
        <RectButton onPress={() => setLinkModal(url)}>
          {Boolean(urlToImage) && <Image uri={urlToImage} />}
          <View style={styles.margin10}>
            {Boolean(title) && (
              <View style={styles.textMargin}>
                <Text variant="h5">{title}</Text>
              </View>
            )}
            {Boolean(description) && (
              <View style={styles.textMargin}>
                <Text>{description}</Text>
              </View>
            )}
            <View style={styles.row}>
              <View>
                <Text>{Boolean(source) && source.name}</Text>
              </View>
              <View>
                {Boolean(diffHours) && diffHours > 24 ? (
                  <Text>{`${Math.ceil(diffHours / 24)} days ago`}</Text>
                ) : (
                  <Text>{`${Math.ceil(diffHours)} hours ago`}</Text>
                )}
              </View>
            </View>
          </View>
        </RectButton>
      </Card>
    );
  };

  if (!(headlines && headlines.status)) {
    console.log(headlines);
    return <Loader />;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <SafeAreaView style={{flex: 1}}>
        {Boolean(headlines) && headlines.status === 'ok' && (
          <FlingGestureHandler
            key="left"
            direction={Directions.LEFT}
            onHandlerStateChange={(ev) => {
              if (ev.nativeEvent.state === State.END) {
                if (index === headlines.articles.length - 1) {
                  return;
                }
                setActiveIndex(index + 1);
              }
            }}>
            <FlingGestureHandler
              key="right"
              direction={Directions.RIGHT}
              onHandlerStateChange={(ev) => {
                if (ev.nativeEvent.state === State.END) {
                  if (index === 0) {
                    return;
                  }
                  setActiveIndex(index - 1);
                }
              }}>
              <SafeAreaView style={{flex: 1, marginVertical: 8}}>
                <StatusBar hidden />
                <FlatList
                  data={headlines.articles}
                  keyExtractor={(_, index) => String(index)}
                  horizontal
                  inverted
                  contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                  }}
                  scrollEnabled={false}
                  removeClippedSubviews={false}
                  CellRendererComponent={({
                    item,
                    index,
                    children,
                    style,
                    ...props
                  }) => {
                    const newStyle = [
                      style,
                      {
                        zIndex: headlines.articles.length - index,
                      },
                    ];
                    return (
                      <View style={newStyle} index={index} {...props}>
                        {children}
                      </View>
                    );
                  }}
                  renderItem={({item, index}) => {
                    const inputRange = [index - 1, index, index + 1];
                    const translateX = scrollXAnimated.interpolate({
                      inputRange,
                      outputRange: [50, 0, -100],
                    });
                    const scale = scrollXAnimated.interpolate({
                      inputRange,
                      outputRange: [0.8, 1, 1.2],
                    });
                    const opacity = scrollXAnimated.interpolate({
                      inputRange,
                      outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
                    });
                    const {source, title, url, urlToImage, publishedAt} = item;
                    const date1 = Date.now();
                    const date2 = publishedAt && Date.parse(publishedAt);
                    const diffTime = Math.abs(date2 - date1);
                    const diffHours = diffTime / (1000 * 60 * 60);

                    return (
                      <Animated.View
                        style={{
                          position: 'absolute',
                          left: -ITEM_WIDTH / 2,
                          width: ITEM_WIDTH,
                          opacity,
                          transform: [
                            {
                              translateX,
                            },
                            {scale},
                          ],
                        }}>
                        <Card key={index} style={styles.itemContainer}>
                          <RectButton
                            style={{flex: 1}}
                            onPress={() => setLinkModal(url)}>
                            <View
                              style={{
                                flex: 1,
                                justifyContent: 'space-between',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row-reverse',
                                  justifyContent: 'space-between',
                                }}>
                                {Boolean(urlToImage) && (
                                  <View
                                    style={{
                                      flex: 7,
                                      borderRadius: 8,
                                      overflow: 'hidden',
                                    }}>
                                    <Image uri={urlToImage} />
                                  </View>
                                )}

                                <View style={{flex: 10, margin: 10}}>
                                  {Boolean(title) && (
                                    <Text variant="h5">{title}</Text>
                                  )}
                                </View>
                              </View>
                              <View style={[styles.row, {margin: 10}]}>
                                <View>
                                  <Text>{Boolean(source) && source.name}</Text>
                                </View>
                                <View>
                                  {Boolean(diffHours) && diffHours > 24 ? (
                                    <Text>{`${Math.ceil(
                                      diffHours / 24,
                                    )} days ago`}</Text>
                                  ) : (
                                    <Text>{`${Math.ceil(
                                      diffHours,
                                    )} hours ago`}</Text>
                                  )}
                                </View>
                              </View>
                            </View>
                          </RectButton>
                        </Card>
                      </Animated.View>
                    );
                  }}
                />
              </SafeAreaView>
            </FlingGestureHandler>
          </FlingGestureHandler>

          // <FlatList
          //   horizontal
          //   data={headlines.articles}
          //   renderItem={renderArticle}
          //   keyExtractor={(item, index) => String(index)}
          // />
        )}
        {Boolean(articles) && articles.status === 'ok' && (
          <View style={{flex: 2}}>
            <FlatList
              data={articles.articles}
              renderItem={renderArticle}
              keyExtractor={(item, index) => String(index)}
            />
          </View>
        )}
        {Boolean(apiError) && (
          <View style={styles.margin10}>
            <Text variant="error">{apiError}</Text>
          </View>
        )}
        <Modal
          isVisible={Boolean(linkModal)}
          onBackButtonPress={closeModal}
          coverScreen={false}
          style={{margin: 0}}
          hasBackdrop={false}
          useNativeDriver
          animationIn="slideInRight"
          animationOut="slideOutRight">
          <LinkModal closeModal={closeModal} uri={linkModal} />
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
