/**
 * 该文件为项目的配置文件，保存着通用性的配置，以及变量。
 */
/**
 * 发送请求基本路径，当前在开发环境，给自己的代理服务器发请求，
 * 若项目上线，配置成真正服务器的地址
 */
export const BASE_URL = "http://localhost:3000";

// 和风天气城市ID
export const CITY = 101010100;

// 和风天气key
export const KEY = "45d4d25d79494ce59f944f1fdb2335a5";
// 和风天气接口
export const WEATHER_URL = `https://devapi.qweather.com/v7/weather/now?location=${CITY}&key=${KEY}`;
