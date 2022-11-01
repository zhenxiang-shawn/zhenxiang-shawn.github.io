---
layout: wiki
wiki: Python
title: Python 中的枚举
order: 350
tags: 
    - Python
references:
    -   title: Getting to Know Enumerations in Python
        url: https://realpython.com/python-enum/#getting-to-know-enumerations-in-python
---
> **什么是枚举?**
>
> 枚举(`enumerate`)是Python内置函数。在python中枚举是一种类（Enum,IntEnum），存放在enum模块中。枚举类型可以给一组标签赋予一组特定的值。

**枚举的特点**

1. 枚举类中不能存在相同的标签名
2. 枚举是可迭代的
3. 不同的枚举标签可以对应相同的值，但它们都会被视为该值对应第一个标签的别名
4. 如果要限制定义枚举时，不能定义相同值的成员。可以使用装饰器@unique
5. 枚举成员之间不能进行大小比较，可进行等值和同一性比较
6. 枚举成员为单例，不可实例化，不可更改

## 定义枚举



### 01. 直接创建类似枚举结构的变量

```python
>>> RED, GREEN, YELLOW = range(3)
>>> RED
0
>>> GREEN
1
```

### 02.使用 `Enum` 来创建枚举类

```python
>>> from enum import Enum

>>> class Day(Enum):
...     MONDAY = 1
...     TUESDAY = 2
...     WEDNESDAY = 3
...     THURSDAY = 4
...     FRIDAY = 5
...     SATURDAY = 6
...     SUNDAY = 7
...
>>> type(Day.MONDAY)
<enum 'Day'
>>> type(Day.TUESDAY)
<enum 'Day'>
```

也可以结合 01, 和 02 一起创建枚举的类.
```python
>>> from enum import Enum

>>> class Season(Enum):
...     WINTER, SPRING, SUMMER, FALL = range(1, 5)
...

>>> list(Season)
[
    <Season.WINTER: 1>,
    <Season.SPRING: 2>,
    <Season.SUMMER: 3>,
    <Season.FALL: 4>
]
```
继承 Enmu 的类还可以被再次继承:
```python
>>> from enum import Enum
>>> import string

>>> class BaseTextEnum(Enum):
...     def as_list(self):
...         try:
...             return list(self.value)
...         except TypeError:
...             return [str(self.value)]
...

>>> class Alphabet(BaseTextEnum):
...     LOWERCASE = string.ascii_lowercase
...     UPPERCASE = string.ascii_uppercase
...

>>> Alphabet.LOWERCASE.as_list()
['a', 'b', 'c', 'd', ..., 'x', 'y', 'z']
```
### 03.使用 `Enum` 的 API 来创建枚举类
#### 可以使用 `list` 来快速创建映射.

```python
>>> from enum import Enum

>>> HTTPStatusCode = Enum(
...     value="HTTPStatusCode",
...     names=[
...         ("OK", 200),
...         ("CREATED", 201),
...         ("BAD_REQUEST", 400),
...         ("NOT_FOUND", 404),
...         ("SERVER_ERROR", 500),
...     ],
... )

>>> list(HTTPStatusCode)
[
    <HTTPStatusCode.OK: 200>,
    <HTTPStatusCode.CREATED: 201>,
    <HTTPStatusCode.BAD_REQUEST: 400>,
    <HTTPStatusCode.NOT_FOUND: 404>,
    <HTTPStatusCode.SERVER_ERROR: 500>
]
```
#### 使用`auto()` 的方法来帮助创建枚举

Python 的enum模块提供了一个方便的函数auto()，该函数允许您为枚举成员设置自动值。此函数的默认行为是将连续整数值分配给成员.

> 您需要为auto()所需的每个自动值调用一次。您还可以auto()与具体值组合，就像您在本例中使用Day.WEDNESDAYand所做的那样Day.SUNDAY。
> 默认情况下，auto()从 开始为每个目标成员分配连续整数1。您可以通过覆盖该._generate_next_value_()方法来调整此默认行为，该方法auto()在后台使用来生成自动值。

**auto() 方法可以自动检测数字.**

```python
>>> from enum import auto, Enum

>>> class Day(Enum):
...     MONDAY = auto()
...     TUESDAY = auto()
...     WEDNESDAY = 3
...     THURSDAY = auto()
...     FRIDAY = auto()
...     SATURDAY = auto()
...     SUNDAY = 7
...

>>> list(Day)
[
    <Day.MONDAY: 1>,
    <Day.TUESDAY: 2>,
    <Day.WEDNESDAY: 3>,
    <Day.THURSDAY: 4>,
    <Day.FRIDAY: 5>,
    <Day.SATURDAY: 6>,
    <Day.SUNDAY: 7>
]
```

**auto() 方法也可以可以自动检测字母.**

```python
>>> from enum import Enum, auto

>>> class CardinalDirection(Enum):
...     def _generate_next_value_(name, start, count, last_values):
...         return name[0]
...     NORTH = auto()
...     SOUTH = auto()
...     EAST = auto()
...     WEST = auto()
...

>>> list(CardinalDirection)
[
    <CardinalDirection.NORTH: 'N'>,
    <CardinalDirection.SOUTH: 'S'>,
    <CardinalDirection.EAST: 'E'>,
    <CardinalDirection.WEST: 'W'>
]
```
#### 使用别名和唯一值创建枚举类

你可以创建两个或多个成员具有相同常量值的枚举。冗余成员称为别名，在某些情况下可能很有用。例如，假设您有一个包含一组操作系统 (OS) 的枚举，如以下代码所示:
```python
>>> from enum import Enum

>>> class OperatingSystem(Enum):
...     UBUNTU = "linux"
...     MACOS = "darwin"
...     WINDOWS = "win"
...     DEBIAN = "linux"
...

>>> # 别名不展示
>>> list(OperatingSystem)
[
    <OperatingSystem.UBUNTU: 'linux'>,
    <OperatingSystem.MACOS: 'darwin'>,
    <OperatingSystem.WINDOWS: 'win'>
]

>>> # 访问别名需要使用到参数: __members__
>>> list(OperatingSystem.__members__.items())
[
    ('UBUNTU', <OperatingSystem.UBUNTU: 'linux'>),
    ('MACOS', <OperatingSystem.MACOS: 'darwin'>),
    ('WINDOWS', <OperatingSystem.WINDOWS: 'win'>),
    ('DEBIAN', <OperatingSystem.UBUNTU: 'linux'>)
]
```
前文提到可以使用`@unique`装饰器来限制定义枚举. 这里是一个例子:
```python
>>> from enum import Enum, unique

>>> @unique
... class OperatingSystem(Enum):
...     UBUNTU = "linux"
...     MACOS = "darwin"
...     WINDOWS = "win"
...     DEBIAN = "linux"
...
Traceback (most recent call last):
    ...
ValueError: duplicate values in <enum 'OperatingSystem'>: DEBIAN -> UBUNTU
```

## 枚举的使用

### 访问枚举成员

常见的三种访问枚举成员的方法:

1. 使用符号 `.`
2. 引用方法: 使用 `EnmuClass("key")`
3. 类似字典的访问方法: `EnmuClass["key"]`


```python
>>> from enum import Enum

>>> class CardinalDirection(Enum):
...     NORTH = "N"
...     SOUTH = "S"
...     EAST = "E"
...     WEST = "W"
...

>>> # Dot notation
>>> # Python 枚举的成员是其包含类的实例。在枚举类解析期间，每个成员都会自动提供一个.name属性，该属性将成员的名称保存为字符串。成员还获得一个.value属性，该属性将分配给成员本身的值存储在类定义中。
>>> # 因此可以使用 CardinalDirection.NORTH.name 或者 CardinalDirection.NORTH.value得到一个对应的字符串.
>>> CardinalDirection.NORTH
<CardinalDirection.NORTH: 'N'>

>>> # Call notation
>>> CardinalDirection("N")
<CardinalDirection.NORTH: 'N'>

>>> # Subscript notation
>>> CardinalDirection["NORTH"]
<CardinalDirection.NORTH: 'N'>
```

### 遍历枚举的成员

```python
>>> for name in Flavor.__members__:
...     print(name)
...
VANILLA
CHOCOLATE
MINT

>>> for name in Flavor.__members__.keys():
...     print(name)
...
VANILLA
CHOCOLATE
MINT

>>> for member in Flavor.__members__.values():
...     print(member)
...
Flavor.VANILLA
Flavor.CHOCOLATE
Flavor.MINT

>>> for name, member in Flavor.__members__.items():
...     print(name, "->", member)
...
VANILLA -> Flavor.VANILLA
CHOCOLATE -> Flavor.CHOCOLATE
MINT -> Flavor.MINT
```

## 枚举中的比较

可以使用`if`...`elif`语句和`match`...`case`语句中使用枚举表明来比较枚举成员。默认情况下，枚举支持两种类型的比较运算符：

1. **身份运算符**，使用[`is`](https://translate.google.com/website?sl=auto&tl=zh-CN&hl=zh-CN&u=https://docs.python.org/3/reference/expressions.html%23is)and[`is not`](https://translate.google.com/website?sl=auto&tl=zh-CN&hl=zh-CN&u=https://docs.python.org/3/reference/expressions.html%23is-not)运算符
2. **算数运算符**，使用`==`and`!=`运算符

身份比较依赖于每个枚举成员都是其枚举类的单例实例这一事实. `is`此特性允许使用和运算符对成员进行快速且廉价的身份比较`is not`。

```python
>>> from enum import Enum

>>> class AtlanticAveSemaphore(Enum):
...     RED = 1
...     YELLOW = 2
...     GREEN = 3
...     PEDESTRIAN_RED = 1
...     PEDESTRIAN_GREEN = 3

>>> red = AtlanticAveSemaphore.RED
>>> red == AtlanticAveSemaphore.RED
True

>>> red != AtlanticAveSemaphore.RED
False

>>> yellow = AtlanticAveSemaphore.YELLOW
>>> yellow == red
False
>>> yellow is red
False
>>> yellow != red
True
>>> yellow is not red
True

>>> pedestrian_red = AtlanticAveSemaphore.PEDESTRIAN_RED
>>> red == pedestrian_red
True
>>> red is pedestrian_red
True

```

```python
>>> from enum import Enum

>>> class Semaphore(Enum):
...     RED = 1
...     YELLOW = 2
...     GREEN = 3
...

>>> def handle_semaphore(light):
...     if light is Semaphore.RED:
...         print("You must stop!")
...     elif light is Semaphore.YELLOW:
...         print("Light will change to red, be careful!")
...     elif light is Semaphore.GREEN:
...         print("You can continue!")
...

>>> handle_semaphore(Semaphore.GREEN)
You can continue!

>>> handle_semaphore(Semaphore.YELLOW)
Light will change to red, be careful!

>>> handle_semaphore(Semaphore.RED)
You must stop!
```





## 枚举排序

默认情况下，Python 的枚举不支持比较运算符，如`>`、`<`、`>=`和`<=`. 这就是为什么您不能直接使用内置[`sorted()`](https://realpython-com.translate.goog/python-sort/?_x_tr_sl=auto&_x_tr_tl=zh-CN&_x_tr_hl=zh-CN)函数对枚举成员进行排序的原因，如下例所示：

```python
>>> from enum import Enum

>>> class Season(Enum):
...     SPRING = 1
...     SUMMER = 2
...     AUTUMN = 3
...     WINTER = 4
...

>>> sorted(Season)
Traceback (most recent call last):
    ...
TypeError: '<' not supported between instances of 'Season' and 'Season'
```

来排序的时候,需要手动映射枚举成员为排序的 key 来进行排序.

```python
>>> sorted(Season, key=lambda season: season.value)
[
    <Season.SPRING: 1>,
    <Season.SUMMER: 2>,
    <Season.AUTUMN: 3>,
    <Season.WINTER: 4>
]

>>> sorted(Season, key=lambda season: season.name)
[
    <Season.AUTUMN: 3>,
    <Season.SPRING: 1>,
    <Season.SUMMER: 2>,
    <Season.WINTER: 4>
]
```

## 其他枚举类

### 构建整数枚举：`IntEnum`

```python
>>> from enum import IntEnum

>>> class Size(IntEnum):
...     S = 1
...     M = 2
...     L = 3
...     XL = "4" #可以成功被转换
...

>>> list(Size)
[<Size.S: 1>, <Size.M: 2>, <Size.L: 3>, <Size.XL: 4>]

>>> class Size(IntEnum):
...     S = 1
...     M = 2
...     L = 3
...     XL = "4.o" #不可以被转换
...
Traceback (most recent call last):
    ...
ValueError: invalid literal for int() with base 10: '4.o'
```

### 使用 `Flag` 来构建枚举

使用 Flag 的好处之一就是可以让一个枚举类型包含另外几种类型.比如以下一个例子:

该枚举在给定的应用程序中包含一组用户角色。此枚举的成员包含整数值，您可以使用按位 OR 运算符 ( `|`) 组合这些值。例如，名为 John 的用户同时具有`USER`和`SUPERVISOR`角色。请注意，存储在其中的对象`john_roles`是您的`Role`枚举的成员。

```python
>>> from enum import IntFlag

>>> class Role(IntFlag):
...     OWNER = 8
...     POWER_USER = 4
...     USER = 2
...     SUPERVISOR = 1
...     ADMIN = OWNER | POWER_USER | USER | SUPERVISOR
...

>>> john_roles = Role.USER | Role.SUPERVISOR
>>> john_roles
<Role.USER|SUPERVISOR: 3>

>>> type(john_roles)
<enum 'Role'>

>>> if Role.USER in john_roles:
...     print("John, you're a user")
...
John, you're a user

>>> if Role.SUPERVISOR in john_roles:
...     print("John, you're a supervisor")
...
John, you're a supervisor

>>> Role.OWNER in Role.ADMIN
True

>>> Role.SUPERVISOR in Role.ADMIN
True
```

