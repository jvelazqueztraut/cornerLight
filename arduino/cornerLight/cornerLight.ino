#include <Adafruit_NeoPixel.h>

//Control pin
#define PIN 12
// Num lights
#define LIGHTS 60

// Parameter 1 = number of pixels in strip
// Parameter 2 = pin number (most are valid)
// Parameter 3 = pixel type flags, add together as needed:
//   NEO_KHZ800  800 KHz bitstream (most NeoPixel products w/WS2812 LEDs)
//   NEO_KHZ400  400 KHz (classic 'v1' (not v2) FLORA pixels, WS2811 drivers)
//   NEO_GRB     Pixels are wired for GRB bitstream (most NeoPixel products)
//   NEO_RGB     Pixels are wired for RGB bitstream (v1 FLORA pixels, not v2)
Adafruit_NeoPixel strip = Adafruit_NeoPixel(LIGHTS, PIN, NEO_GRB + NEO_KHZ800);

// Intensity
enum IntensityType {
  ON, STROBE, SINE, CANDLE
};
IntensityType intensity = STROBE;
float intensityPeriod = 3.0f;
uint8_t intensityMin = 0, intensityMax = 255;

// Pattern
enum PatternType {
  STATIC, DYNAMIC, ROLLER, NOISE, RANDOM
};
PatternType pattern = STATIC;
uint32_t patternColor1 = strip.Color(255, 255, 0);
uint32_t patternColor2 = strip.Color(255, 0, 255);
float patternPeriod = 20.0f;

enum PatternMixType {
  LINEAR, SMOOTH, BINARY
};
PatternMixType patternMix = BINARY;
float patternSize = 0.5f;

float _time = 0;

int counter = 25;

void setup() {
  strip.begin();
  strip.show(); // Initialize all pixels to 'off'

  Serial.begin(115200);
}

uint32_t lerpColor(uint32_t color1, uint32_t color2, float lerp, uint8_t brightness){
  float b = brightness/255.0f;
  
  int r1 = (color1 >> 16) & 0xff;
  float r1_f = b * r1;
  int g1 = (color1 >> 8) & 0xff;
  float g1_f = b * g1;
  int b1 = color1 & 0xff;
  float b1_f = b * b1;

  int r2 = (color2 >> 16) & 0xff;
  float r2_f = b * r2;
  int g2 = (color2 >> 8) & 0xff;
  float g2_f = b * g2;
  int b2 = color2 & 0xff;
  float b2_f = b * b2;

  Serial.print((r2_f-r1_f)*lerp + r1_f);
  Serial.print(',');
  Serial.print((g2_f-g1_f)*lerp + g1_f);
  Serial.print(',');
  Serial.println((b2_f-b1_f)*lerp + b1_f);

  return strip.Color((r2_f-r1_f)*lerp + r1_f,(g2_f-g1_f)*lerp + g1_f,(b2_f-b1_f)*lerp + b1_f);
}

void loop() {
  // Vars
  float dt = millis() / 1000.0f - _time;
  _time += dt;
  /*
  // Intensity
  uint8_t brightness = intensityMin;
  switch (intensity) {
    case ON:
      brightness = intensityMax;
      break;
    case STROBE:
      brightness = fmodf(_time,intensityPeriod) > intensityPeriod / 2.0f ? intensityMax : intensityMin;
      break;
    case SINE:
      brightness = (sin(TWO_PI * _time / intensityPeriod) + 1)*(intensityMax - intensityMin)/2 + intensityMin;
      break;
    case CANDLE:
      brightness = noise(_time / intensityPeriod)*(intensityMax - intensityMin) + intensityMin;
      break;
  }
  
  // Pattern
  float stripInter, timeInter;
  int stripPhase;
  switch (pattern) {
    case STATIC:
      for (int i = 0; i < LIGHTS; i++) {
        stripInter = i/(float)LIGHTS;
        strip.setPixelColor(i,lerpColor(patternColor1, patternColor2, applyPatternMix(stripInter), brightness));
      }
      break;
    case DYNAMIC:
      timeInter = fmodf(_time, patternPeriod);
      if (timeInter < patternPeriod / 2.0f) {
        timeInter = timeInter / patternPeriod / 2.0f;
      }
      else {
        timeInter = (patternPeriod - timeInter) / patternPeriod / 2.0f;
      }
      for (int i = 0; i < LIGHTS; i++) {
        strip.setPixelColor(i,lerpColor(patternColor1, patternColor2, applyPatternMix(timeInter), brightness));
      }
      break;
    case ROLLER:
      for (int i = 0; i < LIGHTS; i++) {
        stripPhase = LIGHTS*fmodf(_time, patternPeriod)/(float)patternPeriod;
        stripInter = 2.0f*((i + stripPhase) % LIGHTS)/(float)LIGHTS - 1.0f;
        if (stripInter < 0 ) {
          strip.setPixelColor(i,lerpColor(patternColor1, patternColor2, applyPatternMix(-stripInter), brightness));
        }
        else {
          strip.setPixelColor(i,lerpColor(patternColor1, patternColor2, applyPatternMix(stripInter), brightness));
        }
      }
      break;
    case NOISE:
      stripPhase = LIGHTS*noise(_time / patternPeriod);
      for (int i = 0; i < LIGHTS; i++) {
        if ( i > stripPhase) {
          stripInter = (i - stripPhase)/(float)LIGHTS;
          strip.setPixelColor(i,lerpColor(patternColor1, patternColor2, applyPatternMix(stripInter), brightness));
        }
        else {
          stripInter = (stripPhase - i)/(float)stripPhase;
          strip.setPixelColor(i,lerpColor(patternColor1, patternColor2, applyPatternMix(stripInter), brightness));
        }
      }
      break;
    case RANDOM:
      if (fmodf(_time,patternPeriod) < dt) {
        stripPhase = (int)random(0, LIGHTS);
        for (int i = 0; i < LIGHTS; i++) {
          if ( i > stripPhase) {
            stripInter = (i - stripPhase)/(float)LIGHTS;
            strip.setPixelColor(i,lerpColor(patternColor1, patternColor2, applyPatternMix(stripInter), brightness));
          }
          else {
            stripInter = (stripPhase - i)/(float)stripPhase;
            strip.setPixelColor(i,lerpColor(patternColor1, patternColor2, applyPatternMix(stripInter), brightness));
          }
        }
      }
      break;
  }
  strip.show();

  if(--counter <= 0){
    for (int i = 0; i < LIGHTS; i++) {
      Serial.print(i);  
      Serial.print(':');  
      Serial.println(strip.getPixelColor(i));  
    }
    counter = 25;
  }
  
  delay(20);
  */
  rainbowCycle(5000);

}

// Slightly different, this makes the rainbow equally distributed throughout
void rainbowCycle(long wait) {
  uint16_t i, j;

  for(j=0; j<256*5; j++) { // 5 cycles of all colors on wheel
    for(i=0; i< strip.numPixels(); i++) {
      Serial.print(i);
      Serial.print(':');
      strip.setPixelColor(i, lerpColor(Wheel(((i * 256 / strip.numPixels()) + j) & 255), strip.Color(255,255,255), 0.15f, 25));
    }
    strip.show();
    delay(wait);
  }
}
// Input a value 0 to 255 to get a color value.
// The colours are a transition r - g - b - back to r.
uint32_t Wheel(byte WheelPos) {
  if(WheelPos < 85) {
   return strip.Color(WheelPos * 3, 255 - WheelPos * 3, 0);
  } else if(WheelPos < 170) {
   WheelPos -= 85;
   return strip.Color(255 - WheelPos * 3, 0, WheelPos * 3);
  } else {
   WheelPos -= 170;
   return strip.Color(0, WheelPos * 3, 255 - WheelPos * 3);
  }
}

float applyPatternMix(float inter) {
  switch (patternMix) {
    case LINEAR:
      inter = inter - patternSize * 2.0f + 1;
      if(inter <= 0.0f) inter = 0.0f;
      if(inter >= 1.0f) inter = 1.0f;
      break;
    case SMOOTH:
      inter = (1.0f - cos(PI * inter)) / 2.0f;
      break;
    case BINARY:
      inter = (inter > patternSize) ? 1.0f : 0.0f;
      break;
  }
  return inter;
}

/*
void keyPressed() {
  if (key == CODED) {
    if ( keyCode == UP) {
      patternPeriod += 0.1;
      Serial.println("Pattern Period:", patternPeriod);
    }
    if ( keyCode == DOWN) {
      patternPeriod -= 0.1;
      Serial.println("Pattern Period:", patternPeriod);
    }
    if ( keyCode == RIGHT) {
      patternSize += 0.0f5;
      Serial.println("Pattern Size:", patternSize);
    }
    if ( keyCode == LEFT) {
      patternSize -= 0.0f5;
      Serial.println("Pattern Size:", patternSize);
    }
  }
  if ( key == 'i' || key == 'I') {
    switch (intensity) {
      case ON:
        intensity = IntensityType.STROBE;
        break;
      case STROBE:
        intensity = IntensityType.SINE;
        break;
      case SINE:
        intensity = IntensityType.CANDLE;
        break;
      case CANDLE:
        intensity = IntensityType.ON;
        break;
    }
    Serial.println("Intensity:", intensity);
  }
  if ( key == 'p' || key == 'P') {
    switch (pattern) {
      case STATIC:
        pattern = PatternType.DYNAMIC;
        break;
      case DYNAMIC:
        pattern = PatternType.ROLLER;
        break;
      case ROLLER:
        pattern = PatternType.NOISE;
        break;
      case NOISE:
        pattern = PatternType.RANDOM;
        break;
      case RANDOM:
        pattern = PatternType.STATIC;
        break;
    }
    Serial.println("Pattern:", pattern);
  }
  if ( key == 'm' || key == 'M') {
    switch (patternMix) {
      case LINEAR:
        patternMix = PatternMixType.SMOOTH;
        break;
      case SINE:
        patternMix = PatternMixType.BINARY;
        break;
      case BINARY:
        patternMix = PatternMixType.LINEAR;
        break;
    }
    Serial.println("Pattern Mix:", patternMix);
  }
}
*/

// Noise
#include <math.h>

float x;
int o3,o5,o6;
byte perm[] = {   151,160,137,91,90, 15,131, 13,201,95,96,
53,194,233, 7,225,140,36,103,30,69,142, 8,99,37,240,21,10,23,190, 6,
148,247,120,234,75, 0,26,197,62,94,252,219,203,117, 35,11,32,57,177,
33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,
48,27,166, 77,146,158,231,83,111,229,122, 60,211,133,230,220,105,92,
41,55,46,245,40,244,102,143,54,65,25,63,161, 1,216,80,73,209,76,132,
187,208, 89, 18,169,200,196,135,130,116,188,159, 86,164,100,109,198,
173,186, 3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,
212,207,206, 59,227, 47,16,58,17,182,189, 28,42,223,183,170,213,119,
248,152,2,44,154,163,70,221,153,101,155,167,43,172, 9,129,22,39,253,
19,98,108,110,79,113,224,232,178,185,112,104,218,246, 97,228,251,34,
242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,
49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,
150,254,138,236,205, 93,222,114, 67,29,24, 72,243,141,128,195,78,66,
215,61,156,180
};

float noise(float x)
{
  int i0 = fastFloor(x);
  int i1 = i0 + 1;
  float x0 = x - i0;
  float x1 = x0 - 1.0f;

  float n0, n1;

  float t0 = 1.0f - x0 * x0;
  t0 *= t0;
  n0 = t0 * t0 * grad(perm[i0 & 0xff], x0);

  float t1 = 1.0f - x1 * x1;
  t1 *= t1;
  n1 = t1 * t1 * grad(perm[i1 & 0xff], x1);
  // The maximum value of this noise is 8*(3/4)^4 = 2.53125
  // A factor of 0.395 scales to fit exactly within [-1,1]
  return 0.395f * (n0 + n1);
}

int fastFloor(float x)
{
  return (x > 0) ? ((int)x) : (((int)x) - 1);
}

float grad(int hash, float x)
{
    int h = hash & 15;
    float grad = 1.0f + (h & 7);    // Gradient value 1.0f, 2.0f, ..., 8.0f
    if ((h & 8) != 0) grad = -grad; // Set a random sign for the gradient
    return (grad * x);              // Multiply the gradient with the distance
}
