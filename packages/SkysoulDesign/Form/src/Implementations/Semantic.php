<?php

namespace SkysoulDesign\Form\Implementations;

use Illuminate\Support\Collection;
use SkysoulDesign\Form\FormBuilder;
use SkysoulDesign\Form\FormBuilderInterface;

class Semantic extends FormBuilder implements FormBuilderInterface
{

    /**
     * Form Class
     * @var string
     */
    protected $formClass = 'ui form';

    /**
     * Wrapper Class
     * @var string
     */
    protected $wrapperClass = 'field';

    /**
     * Button Class
     * @var string
     */
    protected $buttonClass = 'ui button';

    /**
     * Select Class
     * @var string
     */
    protected $selectClass = 'ui dropdown';

    /**
     * Wrapper error Class
     * @var string
     */
    protected $errorClass = 'error';

    /**
     * Error Message Box Class
     * @var string
     */
    protected $errorMessageClass = 'ui error message';

    /**
     * Error Class
     * <div class="..."> ... </div>
     *
     * @return string
     */
    public function getErrorMessageClass()
    {
        return $this->errorMessageClass;
    }

    /**
     * Error Class
     * <div class="..."> ... </div>
     *
     * @return string
     */
    public function getErrorClass()
    {
        return $this->errorClass;
    }

    /**
     * Wrapper Class
     * <div class="..."> ... </div>
     *
     * @return string
     */
    public function getWrapperClass()
    {
        return $this->wrapperClass;
    }

    /**
     * Form Class
     * <div class="..."> ... </div>
     *
     * @return string
     */
    public function getFormClass()
    {
        return $this->formClass;
    }

    /**
     * Button Class
     * <button class="..."> ... </button>
     *
     * @return string
     */
    public function getButtonClass()
    {
        return $this->buttonClass;
    }

    /**
     * Select Class
     * <select class="..."> ... </select>
     *
     * @return string
     */
    public function getSelectClass()
    {
        return $this->selectClass;
    }

    /**
     * Create Label
     *
     * @param string $name
     * @return $this
     */
    public function makeLabel($name)
    {
        return '<label>' . $name . '</label>';
    }

    public function makeErrorMessage($attributes = null, $errors = null, $title = null)
    {
        return '<div ' . $this->map($attributes) . '><div class="header">' . $title . '</div>' . $this->mapUl($errors, "list") . '</div>';
    }

    /**
     * Create Label
     *
     * @param $attributes
     * @param $collection
     * @param $placeholder
     * @param $label
     * @return $this
     */
    public function makeSelect($attributes, $collection, $placeholder, $label)
    {
        return $label . '<select ' . $this->map($attributes) . '><option value="">' . $placeholder . '</option>' . $this->options($collection, true) . '</select>';
    }

    /**
     * Make Form Tag
     *
     * @param Collection $attributes
     * @param string $label
     * @return string
     */
    public function makeForm($attributes, $label)
    {
        return '<form ' . $this->map($attributes) . '>';
    }

    /**
     * Make Input
     *
     * @param Collection $attributes
     * @param string $label
     * @return string
     */
    public function makeInput($attributes, $label)
    {
        return $label . '<input ' . $this->map($attributes) . '>';
    }

    /**
     * Make Input
     *
     * @param Collection $attributes
     * @return string
     */
    public function makeButton($attributes, $text)
    {
        return '<button ' . $this->map($attributes) . '>' . $text . '</button>';
    }

    /**
     * Make Wrapper Class
     *
     * @param $class
     * @param $content
     * @return string
     */
    public function makeWrapper($class, $content)
    {
        return '<div class="' . $class . '">' . $content . '</div>';
    }

}
