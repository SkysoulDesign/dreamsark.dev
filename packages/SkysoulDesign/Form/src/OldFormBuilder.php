<?php

namespace SkysoulDesign\Form;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use SkysoulDesign\Form\Elements\Form;

abstract class OldFormBuilder
{

//    /**
//     * @var Collection
//     */
//    public $form;
//
//    /**
//     * @var Collection
//     */
//    public $bind;
//
//    /**
//     * FormBuilder constructor.
//     * @param Collection $collection
//     */
//    public function __construct(Collection $collection)
//    {
//        $this->collection = $collection;
//        $this->form = $this->collection->make();
//    }


//    /**
//     * Wrap Element
//     *
//     * @param $item
//     * @return $this
//     */
//    protected function wrap($item)
//    {
//        return '<div class="' . $this->getWrapClass() . '">' . $item . '</div>';
//    }

    /**
     * Append Tag to the form List
     *
     * @param $tag
     * @return $this
     */
    protected function append($tag)
    {
        $this->form->push($tag);

        return $this;
    }

//    /**
//     * Open Form Tag
//     *
//     * @param null $method
//     * @param null $action
//     * @return
//     */
//    public function open($method = null, $action = null)
//    {
//        return $this->push()->method($method)->action($action)->class();
//    }

//    /**
//     * Close Form and Bootstrap all the fields
//     *
//     * @return string
//     */
//    public function close()
//    {
//        return dd($this->append('</form>')->generateForm());
//    }

//    /**
//     * Create a new entry on the Form Array
//     *
//     * @param array $data
//     * @return $this
//     */
//    public function push(array $data = [])
//    {
//        $this->form->push($this->collection->make($data));
//        return $this;
//    }

//    /**
//     * Add Method to form
//     *
//     * @param $method
//     * @return $this
//     */
//    public function method($method = null)
//    {
//        return $this->set(['method' => $method], 'POST');
//    }
//
//    /**
//     * Add Method to form
//     *
//     * @param $action
//     * @return $this
//     */
//    public function action($action = null)
//    {
//        return $this->set(['action' => $action], '/');
//    }
//
//
//    /**
//     * Generate Parameters
//     *
//     * @param array $data
//     * @param $default
//     * @return $this
//     * @internal param $key
//     * @internal param $value
//     */
//    public function set(array $data, $default = null)
//    {
//        $this->form->last()->put(key($data), reset($data) ?: $default);
//        return $this;
//    }

    /**
     * Add Method to form
     *
     * @param null $class
     * @return $this
     */
    public function _class($class = null)
    {
        return $this->set(['class' => $class], $this->getFormClass());
    }

//    /**
//     * Add Method to form
//     *
//     * @param string $class
//     * @return $this
//     */
//    public function appendClass($class)
//    {
//        $this->set(['appendClass' => $class]);
//        return $this;
//    }

    protected function makeInput($name)
    {
        return '<input type="' . $this->getInputType($name) . '" name="' . snake_case($name) . '"' . $this->getValue($name) . '>';
    }


    protected function getValue($name)
    {

        if ($this->bind instanceof Collection && ($value = $this->bind->get(snake_case($name)))) {
            return 'value="' . $value . '"';
        }

        return null;
    }

//    protected function makeLabel($label)
//    {
//        return '<label>' . $this->prettify($label) . '</label>';
//    }

//    protected function prettify($string)
//    {
//        return ucwords($string);
//    }

    protected function getInputType($name)
    {

        $types = $this->collection->make([
            'password' => 'password',
            'name' => 'text',
            'default' => 'text'
        ]);

        return $types->get($name, $types->get('default', 'text'));

    }

//    /**
//     * Create Text Input
//     *
//     * @param $name
//     * @param array $values
//     * @return mixed
//     */
//    protected function text($name, $values = [])
//    {
//        return $this->push()->set(['type' => 'text']);
//    }


//    public function withoutLabel()
//    {
//        $this->form->last()->pull('label');
//        return $this;
//    }

//    public function bind(Model $model)
//    {
//        $this->bind = $this->collection->make($model->attributesToArray());
//
//        return $this;
//    }

//    public function __call($name, $value = '')
//    {
//
//        /**
//         * Hack to enable calling ->class
//         */
//        if ($name == 'class') {
//            return $this->_class();
//        }
//
//        if (strpos($name, 'select') !== false) {
//            return $this->select($name, $value);
//        }
//
//        return $this->text($name, $value);
//    }

    protected function makeOption($options)
    {

        $options = $this->collection->make(array_shift($options));

        $options->transform(function ($name, $key) {
            return '<option value="' . $key . '">' . $name . '</option>';
        });

        $options->prepend('<option value="">Gender</option>');

        return $this->selectWrap($options);

    }

    public function select($name, $options)
    {

//        dd(title_case(preg_replace('/(?!^)[A-Z]{2,}(?=[A-Z][a-z])|[A-Z][a-z]/', ' $0', $name)));

        $field = $this->collection->make([
            'label' => $this->makeLabel($name),
            'option' => $this->makeOption($options)->implode('')
        ]);

        $this->form->push($field);

        return $this;

    }

    protected function selectWrap(Collection $item)
    {
        return $item->prepend('<select class="ui dropdown">')->push('</select>');
    }

//    /**
//     * Generate Form Tag
//     *
//     * @param $tag
//     * @param Collection $data
//     * @return string
//     */
//    public function generateTag($tag, Collection $data)
//    {
//        return '<' . $tag . ' ' . $data->map(function ($value, $key) {
//            return $key . '="' . $value . '"';
//        })->implode(' ') . '>';
//
//    }

//    generateTag

    public function submit()
    {
        return $this->append(' < button class="ui button" type = "submit" > Submit</button > ');
    }


}