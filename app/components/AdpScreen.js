import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, WebView, ActivityIndicator} from 'react-native';
import {Actions as NavActions, ActionConst as NavActionConst} from 'react-native-router-flux';
import env from '../core/env';
import i18n from '../i18n/i18n.js';
import MainToolbar from './MainToolbar';
import {trackScreenView} from '../services/googleAnalytics';
import {colors} from '../themes';
import styles from './styles/webViewStyle';

class AdpScreen extends Component {
  constructor(props) {
    super(props);
    this.title = i18n.t('adp-title');
  }

  componentDidMount() {
    trackScreenView(this.title);
  }

  handleBack = () => {
    NavActions.pop();
  };

  render() {
    return (
      <View style={[styles.mainContainer]}>
        <MainToolbar title={this.title} leftButton={{text: i18n.t('mainToolbar-back'), onPress: this.handleBack}}/>
        <WebView
          source={{uri: encodeURI(env.app.links.adpUrl)}}
          style={styles.webView}
          startInLoadingState={true}
          renderLoading={() => <View style={styles.loadingView}><ActivityIndicator color={colors.darkBlue} animating={true} size={'large'} /></View>}
          />
      </View>
    )
  }
}

export default AdpScreen;
