import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '主页',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '品牌设备监控',
        path: 'analysis',
      },
      {
        name: '监控页',
        path: 'monitor',
        hideInMenu: true,
      },
      {
        name: '工作台',
        path: 'workplace',
        // hideInBreadcrumb: true,
        hideInMenu: true,
      },
    ],
  },
  {
    name: '表单',
    icon: 'form',
    path: 'form',
    hideInMenu: true,
    children: [
      {
        name: '基础表单',
        path: 'basic-form',
      },
      {
        name: '分步表单',
        path: 'step-form',
      },
      {
        name: '高级表单',
        authority: 'admin',
        path: 'advanced-form',
      },
    ],
  },
  {
    name: '列表',
    icon: 'table',
    path: 'list',
    hideInMenu: true,
    children: [
      {
        name: '查询表格',
        path: 'table-list',
      },
      {
        name: '标准列表',
        path: 'basic-list',
      },
      {
        name: '卡片列表',
        path: 'card-list',
      },
      {
        name: '搜索列表',
        path: 'search',
        children: [
          {
            name: '搜索列表（文章）',
            path: 'articles',
          },
          {
            name: '搜索列表（项目）',
            path: 'projects',
          },
          {
            name: '搜索列表（应用）',
            path: 'applications',
          },
        ],
      },
    ],
  },
  {
    name: '详情页',
    icon: 'profile',
    path: 'profile',
    hideInMenu: true,
    authority: 'admin',
    children: [
      {
        name: '基础详情页',
        path: 'basic',
      },
      {
        name: '高级详情页',
        path: 'advanced',
        authority: 'admin',
      },
    ],
  },
  {
    name: '品牌/系列管理',
    icon: 'heart-o',
    path: 'brand',
    children: [
      {
        name: '品牌/系列列表',
        path: 'brand-list',
      },
      {
        name: '添加品牌',
        path: 'add-brand',
      },
    ],
  },
  {
    name: '设备类型管理',
    icon: 'calculator',
    path: 'device-type',
    children: [
      {
        name: '设备类型列表',
        path: 'device-type-list',
      },
      {
        name: '添加设备类型',
        path: 'add-device-type',
      },
    ],
  },
  {
    name: '用户设备管理',
    icon: 'solution',
    path: 'device-user',
    children: [
      {
        name: '设备信息查询',
        path: 'search-devices',
      },
      {
        name: '用户设备查询',
        path: 'search-user',
      },
    ],
  },
  {
    name: '广告管理',
    icon: 'picture',
    path: 'ad',
    hideInMenu: true,
    children: [
      {
        name: '广告列表',
        path: 'basic-list',
      },
      {
        name: '发布广告',
        path: 'basic-form',
      },
    ],
  },
  {
    name: '管理员管理',
    icon: 'user',
    path: 'manager',
    children: [
      {
        name: '管理员列表',
        path: 'manager-list',
      },
      {
        name: '添加管理员',
        path: 'add-manager',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
