<?php

/**
 * Class FakerTrait
 */
trait FakerTrait
{
    /**
     * @var Faker\Generator
     */
    public $faker;

    /**
     * init faker
     */
    public function setUp()
    {
        parent::setUp();

        if ($this->faker instanceof Faker\Generator)
            $this->faker;

        $this->faker = app(Faker\Generator::class);
    }

}