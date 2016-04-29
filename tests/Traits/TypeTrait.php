<?php
use DreamsArk\Jobs\Admin\Question\Type\CreateTypeJob;
use DreamsArk\Models\Master\Question\Type;

/**
 * Class TypeTrait
 */
trait TypeTrait
{

    /**
     * Create or Get a Type for Questions
     *
     * @param array $params
     * @return Type
     */
    public function createType($params = [])
    {

        $faker = app(Faker\Generator::class);

        $data = array_merge([
            'name'         => $faker->word,
            'display_name' => $faker->word,
        ], $params);

        return dispatch(new CreateTypeJob($data));

    }

    /**
     * Get or Create a new Type
     *
     * @param $name
     * @return Type
     */
    public function getOrCreateType($name)
    {
        return app(Type::class)->where(compact('name'))->first() ?: $this->createType(compact('name'));
    }

}