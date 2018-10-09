# 路线图1

## 启动服务器

```sh
$ npm i
$ npm start
```

> public 目录即为网站根目录，所有的静态页面放入 public 下面。

## 获取课程的分页数据

地址： `/api/course`

* **请求参数：**

| 参数名         | 类型     | 默认值      | 说明        |
|-------------|--------|----------|-----------|
| \_page      | Number | 1        | 请求的第几页数据  |
| \_limit     | Number | Infinity | 一页多少条数据   |
| category_Id | Number | 无        | 课程的分类的 id |

* **响应参数**

返回的数据是数组类型。例如：

```json
[
  {
    id: 1000,
    course_name: "见流将决此安处",
    autor: "方娜",
    college: "所又民划历众",
    category_Id: 2
  },
  {
    id: 1001,
    course_name: "次精其江点可",
    autor: "张军",
    college: "府与划造相活",
    category_Id: 2
  },
  {
    id: 1010,
    course_name: "机矿矿着外代明可传数集面",
    autor: "曹敏",
    college: "感同特应每格",
    category_Id: 2
  },
  // .....
]
```

数组中每个元素的属性说明：

| 参数名         | 类型     | 说明    |
|-------------|--------|-------|
| id          | Number | 课程主键  |
| course_name | String | 课程名字  |
| autor       | String | 作者    |
| college     | String | 大学    |
| category_Id | Number | 分类 Id |

* **响应头部**

后台返回的响应头部中增加：`X-Total-Count`,它的值为查询数据的总条数。例如：

```
X-Total-Count: 29
```

**demo:**

```js
$.ajax({
  url: '/api/course',
  data: '',
  type: 'GET',
  dataType: 'json',
  success: function(data, status, xhr) {
    // data: 后台返回数据
    // 获取后台的总条数
    xhr.getResponseHeader('X-Total-Count');
  }
});
```

## 根据ID获取课程信息

根据ID获取课程的信息跟获取分页数据的接口一致，只需要添加id的过滤参数。

* **地址**： `/api/course`

* **请求参数：**

| 参数名 | 类型     | 默认值 | 说明    |
|-----|--------|-----|-------|
| id  | Number | 无   | 课程的id |


* 响应参数同分页请求。

```js
$.ajax({
  url: '/api/course',
  data: 'id=1002',
  type: 'GET',
  dataType: 'json',
  success: function(data,status,xhr) {
    // data: 后台返回数据
    // 获取后台的总条数
    // xhr.getResponseHeader("X-Total-Count");
    console.log(data); 
    // 返回如下结果
    /*
    [{
      id: 1002,
      course_name: "水边认战议近流",
      autor: "段平",
      college: "里声群低习节",
      category_Id: 4
    }]
    */
  }
});
```

## 添加课程信息

添加课程信息，请求类型必须是`post`。

* **请求地址：** `/api/course`

* **请求参数为**

| 参数名         | 类型     | 说明   |
|-------------|--------|------|
| id          | Number | 课程主键 |
| course_name | String | 课程名字 |
| autor       | String | 作者   |
| college     | String | 大学   |
| category_Id | Number | 分类Id |

* **demo**

```js
$.ajax({
  url: '/api/course',
  type: 'POST',
  data: {
    id: 3002,
    course_name: "水边认战议近流",
    autor: "段平",
    college: "里声群低习节",
    category_Id: 4
  },
  dataType: 'json',
  success: function(data) {
    console.log(data);
  }
});
```

## 修改课程信息

修改课程信息，请求类型必须是`put`。

* **请求地址：** `/api/course/{id}`

> id 为课程主键的值。

* **请求参数为**

| 参数名         | 类型     | 说明   |
|-------------|--------|------|
| course_name | String | 课程名字 |
| autor       | String | 作者   |
| college     | String | 大学   |
| category_Id | Number | 分类Id |

* **demo**

```js
$.ajax({
  url: '/api/course/3002',
  type: 'PUT',
  data: {
    course_name: "水边认战议近流33333",
    autor: "段平333",
    college: "里声群低习节",
    category_Id: 4
  },
  dataType: 'json',
  success: function(data) {
    console.log(data);
  }
});
```

## 删除课程信息

删除课程信息，请求类型必须是`delete`。

* **请求地址：** `/api/course/{id}`

> id 为课程主键的值。

* **demo**

```js
$.ajax({
  url: '/api/course/3002',
  type: 'DELETE',
  dataType: 'json',
  success: function(data) {
    console.log(data);
  }
});
```