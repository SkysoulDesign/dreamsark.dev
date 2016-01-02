<?php

namespace SkysoulDesign\Form;


interface FormBuilderInterface
{
    /**
     * Wrap Class
     * @var string
     */
    public function getWrapperClass();

    /**
     * Wrap Class
     * <div class="..."> ... </div>
     *
     * @return string
     */
    public function getFormClass();

    /**
     * Create Label
     *
     * @param string $name
     * @return $this
     */
    public function makeLabel($name);

}