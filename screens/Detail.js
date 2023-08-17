import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  View,
  Modal,
  Pressable,
} from 'react-native';
import {getMovie} from '../services/service';
import {ScrollView} from 'react-native-gesture-handler';
// import StarRating from 'react-native-star-rating';
import dateFormat from 'dateformat';
import PlayButton from '../components/PlayButton';
import Video from '../components/Video';

const placeholderImage = require('../assets/images/placeholder.png');
const height = Dimensions.get('screen').height;

const Detail = ({route, navigation}) => {
  const movieId = route.params.movieId;
  const [movieDetail, setmovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);
  const [rating, setRating] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getMovie(movieId).then(movieData => {
      setmovieDetail(movieData);
      setLoaded(true);
    });
  }, [movieId]);

  const videoShow = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <React.Fragment>
      {loaded && (
        <View>
          <ScrollView>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={
                movieDetail.poster_path
                  ? {
                      uri:
                        'https://image.tmdb.org/t/p/w500' +
                        movieDetail.poster_path,
                    }
                  : placeholderImage
              }
            />
            <View style={styles.conatiner}>
              <View style={styles.playButton}>
                <PlayButton handlePress={videoShow} />
              </View>
              <Text style={styles.movietitle}>{movieDetail.title}</Text>
              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map(genre => {
                    return (
                      <Text style={styles.genre} key={genre.id}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}
            </View>
            {/* <StarRating maxStars={5} rating={movieDetail.vote_average / 2} /> */}
            <Text style={styles.overview}>{movieDetail.overview}</Text>
            <Text style={styles.relase}>
              {'Release date: ' +
                dateFormat(movieDetail.release_date, 'mmmm dd, yyyy')}
            </Text>
          </ScrollView>
          <Modal
            supportedOrientations={['portrait', 'landscape']}
            animationType="slide"
            visible={modalVisible}>
            <View style={styles.videoModal}>
              <Video onClose={videoShow} />
            </View>
          </Modal>
        </View>
      )}
      {!loaded && <ActivityIndicator size="small" color="#0000ff" />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  genre: {
    marginRight: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  image: {
    height: height / 2,
  },
  movietitle: {
    paddingTop: 15,
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  overview: {
    padding: 15,
    color: '#000',
  },
  relase: {
    padding: 15,
    color: '#000',
    fontWeight: 'bold',
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Detail;
