<?php

namespace SkysoulDesign\Form;


use Illuminate\Support\Collection;

/**
 * Class Tag
 *
 * @package SkysoulDesign\Form
 */
class Tag
{

    /**
     * @var string
     */
    public $name;

    /**
     * @var null|string
     */
    private $content;

    /**
     * @var Collection
     */
    private $attributes;

    /**
     * @var $this
     */
    public $label;

    /**
     * @var $this
     */
    public $wrapper;

    /**
     * @var $this
     */
    public $parent;

    /**
     * @var Collection
     */
    private $children = [];


    /**
     * Tag constructor.
     *
     * @param string $name
     * @param null $content
     * @param array $attributes
     * @param array $children
     */
    public function __construct($name = '', $content = null, $attributes = [], $children = [])
    {
        $this->name = $name;
        $this->content = $content;
        $this->attributes = collect($attributes);
        $this->children = collect($children);
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @return array
     */
    public function getAttributes()
    {
        return $this->attributes;
    }

    /**
     * @param $key
     * @param null $default
     * @return array
     */
    public function getAttribute($key, $default = null)
    {
        return array_get($this->attributes, $key) ?: $default;
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @param array $attributes
     */
    public function setAttributes(array $attributes)
    {
        $this->attributes = collect($attributes);
    }

    /**
     * @param string $key
     * @param string $value
     */
    public function setAttribute($key, $value)
    {
        $this->attributes->put($key, $value);
    }

    /**
     * @param Tag $tag
     * @return Tag
     */
    public function addChild(Tag $tag)
    {
        $tag->setParent($this);
        return $this->children->push($tag);
    }

    /**
     * @return Collection
     */
    public function getChildren()
    {
        return $this->children;
    }

    /**
     * @param null $content
     * @return string
     */
    public function toHTML($content = null)
    {

        $tag = "<$this->name ";

        foreach ($this->getAttributes() as $key => $value) {
            $tag .= "$key=\"$value\" ";
        }

        $tag = trim($tag) . ">\n";


        if ($content) {
            $tag .= $content . "</$this->name>";

        }

        return $tag;

    }

    /**
     * @return null|string
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * @param null|string $content
     * @return $this
     */
    public function setContent($content)
    {
        $this->content = $content;
        return $this;
    }

    /**
     * @return $this
     */
    public function getLabel()
    {
        return $this->label;
    }

    /**
     * @param $content
     * @return $this
     */
    public function label($content)
    {
        return $this->getLabel()->setContent($content);
    }

    /**
     * @param $this $label
     */
    public function setLabel(Tag $label)
    {
        $label->setParent($this);

        $this->label = $label;
    }

    /**
     * Check if tag has Parent
     *
     * @return bool
     */
    public function hasParent()
    {
        return $this->getParent() ? true : false;
    }

    /**
     * Check if tag has Label
     *
     * @return bool
     */
    public function hasLabel()
    {
        return $this->getLabel() ? true : false;
    }

    /**
     * Check if tag has Label
     *
     * @return bool
     */
    public function hasChildren()
    {
        return $this->getChildren()->count() > 0;
    }

    /**
     * Check if tag has Label
     *
     * @return bool
     */
    public function hasWrapper()
    {
        return $this->getWrapper() ? true : false;
    }

    /**
     * @return $this
     */
    public function getParent()
    {
        return $this->parent;
    }

    /**
     * @param Tag $parent
     */
    public function setParent(Tag $parent)
    {
        $this->parent = $parent;
    }

    public function __toString()
    {
        return $this->getParent()->toHTML();
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
            $this->setAttribute($name, array_first($parameters));
        }

        return $this;

    }

    /**
     * @return $this
     */
    public function getWrapper()
    {
        return $this->wrapper;
    }

    /**
     * @param Tag $wrapper
     */
    public function setWrapper(Tag $wrapper)
    {
        $this->wrapper = $wrapper;
    }

}