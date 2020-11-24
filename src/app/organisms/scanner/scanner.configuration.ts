import { QuaggaJSConfigObject } from '@ericblade/quagga2';

/**
 * Configuration options to pass to the QuaggaJS scanner
 */
export const scannerConfiguration: QuaggaJSConfigObject = {
  inputStream: {
    constraints: {
      facingMode: 'environment',
    },
    area: {
      // Read 80% of vertical-middle of the detection area
      top: '40%',
      right: '0%',
      left: '0%',
      bottom: '40%',
    },
  },
  decoder: {
    readers: ['ean_reader'],
    debug: {
      drawBoundingBox: true,
      showFrequency: true,
      drawScanline: true,
      showPattern: true,
    },
  },
};
