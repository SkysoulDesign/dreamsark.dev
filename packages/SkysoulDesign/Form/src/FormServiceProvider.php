<?php

namespace SkysoulDesign\Form;

use Illuminate\Foundation\Application;
use Illuminate\Support\ServiceProvider;
use SkysoulDesign\Form\Implementations\Semantic;

class FormServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind('form', Semantic::class, function (Application $app) {
            return $app->make(FormBuilder::class);
        });
    }

}