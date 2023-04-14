---
title: Angular系列
---

### 组件Component
用于视图展示，通常由html+ts+less文件组成   
创建命令：```ng g c 路径/组件名 --spec=false```   
用@Component修饰，关联模板方式
```ts
@Component({
    selector: `name`,
    template: ``,  // 内联模板
    templateUrl: ``,  // 外联模板
    styleUrls: [``],
    styles: [``],
})

@Input() name; // 子组件接收父组件传值
@Output() parentFun = new EventEmitter();
this.parentFun.emit()
```

### 模块Module
可存放组件，一个组件只能依附于一个模块   
创建命令：```ng g m 路径/模块名```
用@NgModule修饰的类   
```declarations:[]、imports:[]、bootstrap:[]、exports:[]```

### 路由
routerLink：html中指定要导航的页面```<a routerLink="/h/car">```   
Routes：（routes：Routes）所有路由配置   
Router：（router：Router）当前路由对象，例如```.navigate()```跳转方法   
![Router1.png](/assets/angular/Router1.png)
ActivatedRoute：（routeInfo：ActivatedRoute）路由参数信息，```routeInfo.snapshot.queryParams.id```、```routeInfo.queryParams.subacribe(param => {param.id})```
```ts
const routes: Routes [
    {
        path: '',
        component: MainComponent,
        children: [
            {path: '', pathMath: 'full', redirectTo: 'work-station'},
            {
                path: 'work-station',
                loadChildren: () => import().then(m => m.WorkStationModule),
                canActivate: [LoginGuard], // 路由守卫
                data: {
                    breadcrumb: '首页'
                }
            }
        ]
    }
]

Routes接口
path:string
pathMatch:’prefix’|’full’=‘prefix’
component:Type<any>
redirectTo:string
canActivete:any[]
data:{}
children:Route[]
loadChildren:LoadChildrenCallback
```
![Router.png](/assets/angular/Router.png)
![CanActivate.png](/assets/angular/CanActivate.png)

### 服务service
逻辑处理功能，相当于公共方法   
创建命令：```ng g s 路径/服务名```
```ts
@Injectable ({
    providedIn: 'root' // 单例服务
})
export class PlanStageService extends BaseDictService {
    readonly MAKE = new NameId('001', '计划制定');
}
```

### 依赖注入DI

