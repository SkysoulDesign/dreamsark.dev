<?php

namespace SkysoulDesign\Form\Implementations;

use SkysoulDesign\Form\FormBuilder;
use SkysoulDesign\Form\Tag;

/**
 * Class Semantic
 *
 * @package SkysoulDesign\Form\Implementations
 */
class Semantic extends FormBuilder
{

    /**
     * Form Class
     *
     * @var string
     */
    protected $formClass = 'ui form';

    /**
     * Wrapper Class
     *
     * @var string
     */
    protected $wrapperClass = 'field';

    /**
     * Checkbox Class
     *
     * @var string
     */
    protected $checkboxClass = 'ui checkbox';

    /**
     * Make Form Tag
     *
     * @param Tag $tag
     * @return string
     */
    public function makeForm(Tag $tag)
    {
        return $tag->toHTML();
    }

    /**
     * Make Form Tag
     *
     * @param Tag $tag
     * @return string
     */
    public function makeInput(Tag $tag)
    {
        return $tag->toHTML();
    }

    /**
     * Make Form Tag
     *
     * @param Tag $tag
     * @return string
     */
    public function makeCheckbox(Tag $tag)
    {
        dd("hi");
        return 'hi';
    }

    /**
     * Create Label
     *
     * @param Tag $tag
     * @return $this
     */
    public function makeLabel(Tag $tag)
    {
        $parent = $tag->getParent();
        return $tag->toHTML(
            $tag->getContent() ?: $parent->getAttribute('placeholder', $parent->getName())
        );
    }

    /**
     * Make Wrapper Class
     *
     * @param Tag $tag
     * @return string
     */
    public function makeDiv(Tag $tag)
    {
        return $tag->toHTML();
    }

    /**
     * Make Wrapper Class
     *
     * @param $content
     * @return string
     */
    public function makeWrapper(Tag $tag, $content)
    {
        return $tag->toHTML($content);
    }

}
