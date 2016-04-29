import webpack from 'webpack';
import webpackConfig from './webpack.config';

/**
 * Creates application bundles from the source files.
 */
const bundle = function() {
  webpack(webpackConfig).run((err, stats) => {
      if (err) {
        return err;
      }
      
      return stats;
    });
};

export default bundle;
