import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {
  getUpcomingMovies,
  getPopularTv,
  getPopularMovies,
  getFmailyMovie,
} from '../services/service';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';
import Error from '../components/Error';

const dimentions = Dimensions.get('screen');
const Home = ({navigation}) => {
  console.log(dimentions);
  const [movieImages, setMovieImages] = useState([]);
  const [popularMovies, setPopularMovies] = useState();
  const [popularTv, setPopularTv] = useState();
  const [fmailyMovies, setFmailyMovies] = useState();
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTv(),
      getFmailyMovie(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvData,
          familyMoviesData,
        ]) => {
          const moviesImagesArray = [];
          upcomingMoviesData.forEach(item => {
            moviesImagesArray.push(
              'https://image.tmdb.org/t/p/w500' + item.poster_path,
            );
          });
          setMovieImages(moviesImagesArray);
          setPopularMovies(popularMoviesData);
          setPopularTv(popularTvData);
          setFmailyMovies(familyMoviesData);
        },
      )
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);
  console.log('Family movies', fmailyMovies);
  // console.log('susheel', movieImages);
  return (
    <React.Fragment>
      {loaded && !error && (
        <ScrollView>
          {movieImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={movieImages}
                dotStyle={styles.sliderStyle}
                autoplay
                circleLoop={true}
                sliderBoxHeight={dimentions.height / 1.5}
              />
            </View>
          )}
          {popularMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular Movies"
                content={popularMovies}></List>
            </View>
          )}

          {popularTv && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular Tv"
                content={popularTv}></List>
            </View>
          )}
          {fmailyMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Family Movies"
                content={fmailyMovies}></List>
            </View>
          )}
        </ScrollView>
      )}
      {!loaded && <ActivityIndicator size="small" color="#0000ff" />}
      {error && <Error />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
