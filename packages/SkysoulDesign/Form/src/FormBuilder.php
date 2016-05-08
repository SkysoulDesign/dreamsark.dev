<?php

namespace SkysoulDesign\Form;

use Illuminate\Support\Collection;

/**
 * Class FormBuilder
 *
 * @package SkysoulDesign\Form
 */
abstract class FormBuilder
{

    /**
     * @var Tag
     */
    public $form;

    /**
     * @var Tag
     */
    public $active;

    /**
     * FormBuilder constructor.
     *
     * @param Collection $form
     */
    public function __construct(Collection $form)
    {
        $this->form = $form;
    }

    /**
     * Form Open Method
     *
     * @param string $method
     * @param string $action
     * @return $this
     */
    public function open($method = 'post', $action = '/')
    {

        $form = $this->createTag('form', null, [
            'class' => $this->get('formClass'),
            'method' => $method,
            'action' => $action,
        ]);

        $this->form = $form;
        $this->active = $this->form;

        return $this;

    }

    /**
     * Dynamic Action to element
     *
     * @param $name
     * @param array $params
     * @return $this
     */
    public function route($name, $params = [])
    {
        return $this->set('action', route($name, $params));
    }

    /**
     * Close Form
     */
    public function close()
    {
        return "</form>";
    }

    /**
     * @param $content
     * @param array $attributes
     * @return $this
     * @internal param string $class
     */
    public function label($content, $attributes = [])
    {
        $label = $this->active->getLabel()
            ->setContent($content);

        foreach ($attributes as $key => $value)
            $label->setAttribute($key, $value);

        return $this;
    }

    /**
     * @param $name
     * @param null $content
     * @param array $attributes
     * @return Tag
     */
    public function createTag($name, $content = null, $attributes = [])
    {
        return new Tag($name, $content, $attributes);
    }

    /**
     * Add Field to the Form
     *
     * @param $type
     * @param $name
     * @param null $value
     * @param null $placeholder
     * @return Tag
     */
    public function addInput($type, $name, $placeholder = null, $value = null)
    {

        $input = $this->createTag('input', null, [
            'type' => $type,
            'name' => $name,
            'placeholder' => $placeholder,
            'value' => $value
        ]);

        $input->setLabel(
            $this->createTag('label')
        );

        $input->setWrapper(
            $this->createTag('div', null, [
                'class' => $this->get('wrapperClass')
            ])
        );

        $this->form->addChild($input);
        $this->active = $input;

        return $this;

    }

    /**
     * @param $type
     * @param $name
     * @param null $placeholder
     * @param null $value
     * @return $this
     */
    public function addCheckbox($name, $placeholder = null, $value = null)
    {

        $checkbox = $this->createTag('input', null, [
            'type' => 'checkbox',
            'name' => $name
        ]);

        $checkbox->setLabel(
            $this->createTag('label')
        );

        $formWrapper = $this->createTag('div', null, [
            'class' => $this->get('wrapperClass')
        ]);

        $formWrapper->setWrapper(
            $this->createTag('div', null, [
                'class' => $this->get('checkboxClass')
            ])
        );

        $checkbox->setWrapper($formWrapper);


        $this->form->addChild($checkbox);
        $this->active = $checkbox;

        return $this;

    }

    /**
     * @param $name
     * @param null $placeholder
     * @param null $value
     * @return $this
     */
    public function text($name, $placeholder = null, $value = null)
    {
        return $this->addInput('text', $name, $placeholder, $value);
    }

    /**
     * @param $name
     * @param null $placeholder
     * @param null $value
     * @return Tag
     */
    public function checkbox($name, $placeholder = null, $value = null)
    {
        return $this->addCheckbox($name, $placeholder, $value);
    }

    /**
     * Wrapper a tag
     *
     * @param Tag $wrapper
     * @param $content
     * @return Tag
     */
    public function solveWrapper(Tag $wrapper, $content)
    {

        if ($wrapper->hasWrapper()) {
            $content = $this->solveWrapper($wrapper->getWrapper(), implode('', $content));
        }

        return $this->makeWrapper($wrapper, implode('', $content));

    }

    /**
     * @param Tag $tag
     * @return mixed
     */
    private function make(Tag $tag)
    {

        if ($wrapper = $tag->getWrapper()) {

            /**
             * Disable Wrapper so it wont fail here again on the next loop
             */
            $tag->wrapper = null;

            return $this->solveWrapper($wrapper, [
                $this->make($tag->getLabel()),
                $this->make($tag)
            ]);

        }

        $class = 'make' . title_case($tag->getName());

        return $this->$class($tag);

    }

    /**
     * @return Collection
     */
    private function generateForm()
    {
        return $this->make($this->active);
    }

    /**
     * Generate Tags HTML
     *
     * @param $tag
     * @return string
     */
    public function generate(Tag $tag)
    {
        return "<$tag->getName() {$this->map($tag->getAttributes())}>";
    }

    /**
     * Generate HTML attributes
     *
     * @param Collection|array $attributes
     * @return string
     */
    public function map($attributes = [])
    {

        $list = '';

        foreach ($attributes as $key => $value) {
            $list .= "$key=\"$value\"";
        }

        return $list;

    }

    /**
     * Set Key to attribute list of a tag
     *
     * @param $key
     * @param $value
     * @return $this
     */
    private function set($key, $value)
    {
        $this->active->setAttribute($key, $value);
        return $this;
    }

    /**
     * @param $property
     * @param null $default
     * @return null
     */
    private function get($property, $default = null)
    {
        if (property_exists($this, $property)) {
            return $this->$property;
        }

        return $default;
    }

    public function __toString()
    {
        return $this->generateForm();
    }

    /**
     * Handle Magic Methods
     *
     * @param $name
     * @param $parameters
     * @return mixed
     */
    public function __call($name, $parameters)
    {

        if (!method_exists($this, $name)) {
            $this->set($name, array_first($parameters));
        }

        return $this;

    }

}