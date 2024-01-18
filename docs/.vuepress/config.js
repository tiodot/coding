import { defaultTheme } from '@vuepress/theme-default'
import fs from 'node:fs';
import path from 'node:path';

const getSidebarByDir = () => {
  const dirConfig = [
    {text: '首页', link: '/'},
    {text: '算法相关', dir: 'algorithm'}, 
    {text: '前端 Coding', dir: 'utils'}
  ]
  return dirConfig.map(config => {
    if (!config.dir) return config;
    const files = fs.readdirSync(path.resolve(__dirname, '..', config.dir));
    console.log(files);
    const filePath = files.filter(file => file.endsWith('.md')).map(name => `/${config.dir}/${name}`);
    return {
      text: config.text,
      children: filePath
    }
  })
}
// console.log('----config---', getSidebarByDir())

export default {
  theme: defaultTheme({
    // 在这里进行配置
    sidebar: getSidebarByDir()
  }),
}