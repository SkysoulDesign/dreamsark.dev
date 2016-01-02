**hello**

Open and close are required in order to the  form work

open()->close()

#open()

optional params

$method, $action

return 

<form method="$default" action="$default" class="$default">

#open()->method()->action()->class()
#open()->bind($model|array)

#text(name) = <label>Name</label> <input name="name">

#any()->class('test') = override default class
#any()->appendClass('test') = default class="$default test"
#any()->append('id', 'loginForm') = id='loginForm'
#any()->append(selected) = <... selected ...>
#any()->any(anyString) = <... any="anyString" ...>
#any()->any() = <... any ...>

#any()->wrapperClass('error') = <... class="error" ...>
#any()->appendWrapperClass('error') = <... class="$default error" ...>

#text(name) = <label>Name</label> <input name="name">
#text(name, value, label) = <label>label</label> <input name="name" value="value">

#select(name, array, label) = <label>Name</label> <select name="name">...</select>


Helper Functions

$this->map([key=>value]) = key="value" ...="..." ...
$this->options(array, prettify = false) = <option value="key">value</option>
$this->prettify(any_string) = Any String 

Form::open('POST', route('login'))->appendClass('error')
      ->text('username', 'DefaultUserName')->withoutLabel()
      ->password('password')      
      ->close()