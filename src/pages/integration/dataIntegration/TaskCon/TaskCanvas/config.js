import { FILTER_RELATION_TYPE } from 'src/pages/worksheet/common/WorkSheetFilter/enum';

export const tW = 220;
export const tH = 58;
export const tLine = 60;
export const tBottom = 16;

export const NODE_TYPE_LIST = [
  {
    nodeType: 'SOURCE_TABLE',
    icon: 'storage',
    name: _l('读取数据源'),
    color: '#DDDDDD',
  },
  {
    nodeType: 'UNION',
    icon: 'merge',
    name: _l('数据合并'),
    color: '#1FBCD4',
  },
  {
    nodeType: 'JOIN',
    icon: 'join_inner',
    name: _l('多表连接'),
    color: '#2196F3',
  },
  {
    nodeType: 'AGGREGATE',
    icon: 'classify',
    name: _l('分类汇总'),
    color: '#FFA340',
  },
  {
    nodeType: 'FILTER',
    icon: 'filter',
    name: _l('筛选过滤'),
    color: '#4C7D9E',
  },
  {
    nodeType: 'DEST_TABLE',
    icon: 'storage',
    name: _l('写入数据目的地'),
    color: '#DDDDDD',
  },
];

export const ACTION_LIST = [
  {
    txt: _l('多表连接'),
    type: 'JOIN',
    color: '#2196F3',
    icon: 'join_inner',
  },
  {
    txt: _l('数据合并'),
    type: 'UNION',
    color: '#1FBCD4',
    icon: 'merge',
  },
  {
    txt: _l('筛选过滤'),
    type: 'FILTER',
    color: '#4C7D9E',
    icon: 'filter',
  },
  {
    txt: _l('分类汇总'),
    type: 'AGGREGATE',
    color: '#FFA340',
    icon: 'classify',
  },
];
//表连接类型
export const JOIN_TYPE = [
  {
    txt: _l('内连接'),
    type: 'INNER_JOIN',
    color: '#2196F3',
    img: 'joinInner',
    tips: _l('左右互查，只合并命中条目'),
  },
  {
    txt: _l('左连接'),
    type: 'LEFT_JOIN',
    color: '#2196F3',
    img: 'joinLeft',
    tips: _l('左查右，合并全部'),
  },
  {
    txt: _l('右连接'),
    type: 'RIGHT_JOIN',
    color: '#2196F3',
    img: 'joinRight',
    tips: _l('右查左，合并全部'),
  },
  {
    txt: _l('全连接'), //全外连接
    type: 'FULL_OUTER_JOIN',
    color: '#2196F3',
    img: 'joinFull',
    tips: _l('左右表按连接字段全部合并'),
  },
];

export const FILTER_RELATION_TYPE_DATA = [
  { text: _l('且'), value: FILTER_RELATION_TYPE.AND },
  { text: _l('或'), value: FILTER_RELATION_TYPE.OR },
];
export const TYPE_DATA = [
  { text: _l('且'), value: 'AND' },
  { text: _l('或'), value: 'OR' },
  // { text: _l('非'), value: 'NOT' },
];
//节点状态 //字段状态
export const node_status = [
  { text: _l('正常'), value: 'NORMAL' },
  { text: _l('失效'), value: 'DISABLE' },
];
//聚合函数类型
export const OPERATION_TYPE_DATA = [
  { text: _l('求和'), value: 'SUM' },
  { text: _l('最大值'), value: 'MAX' },
  { text: _l('最小值'), value: 'MIN' },
  { text: _l('平均值'), value: 'AVG' },
  { text: _l('计数'), value: 'COUNT' },
  // { text: _l('去重计数'), value: 'COUNT' },
];

//数据合并类型
export const UNION_TYPE_LIST = [
  {
    type: 'UNION',
    txt: _l('去重合并'),
    tips: _l('合并时去掉两个表中重复的行记录，保留唯一记录。'),
    Er: 'UNION',
    img: 'unionImg',
  },
  {
    type: 'UNION_ALL',
    txt: _l('全部合并'),
    tips: _l('合并时保留两个表中所有的行记录'),
    Er: 'UNION ALL',
    img: 'unionAllImg',
  },
  {
    type: 'INTERSECT',
    txt: _l('相交并去重'),
    tips: _l('只有在两个表中都存在的记录，才会被保留，并去除重复记录'),
    Er: 'INTERSECT',
    img: 'intersectImg',
  },
  {
    type: 'INTERSECT_ALL',
    txt: _l('相交'),
    tips: _l('只有在两个表中都存在的记录，才会被保留，不会去除重复记录'),
    Er: 'INTERSECT ALL',
    img: 'intersectAllImg',
  },
  {
    type: 'EXCEPT',
    txt: _l('排除并去重'),
    tips: _l('只有在左表中存在，但在右表中不存在的记录会被保留，并去除重复记录'),
    Er: 'EXCEPT',
    img: 'exceptImg',
  },
  {
    type: 'EXCEPT_ALL',
    txt: _l('排除'),
    tips: _l('只有在左表中存在，但在右表中不存在的记录会被保留，不会去除重复记录'),
    Er: 'EXCEPT ALL',
    img: 'exceptAllImg',
  },
];

export const TASK_STATUS_TXT = {
  UN_PUBLIC: _l('未发布'),
  RUNNING: _l('运行中'),
  STOP: _l('停止'),
  ERROR: _l('异常'),
};
