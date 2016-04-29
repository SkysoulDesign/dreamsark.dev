<?php
use DreamsArk\Jobs\User\Role\CreateRoleJob;

/**
 * Class UserTrait
 */
trait RoleTrait
{

    /**
     * Create a user
     *
     * @param array $params
     * @return \DreamsArk\Models\User\User $user
     */
    public function createRole($params = [])
    {

        $faker = app(Faker\Generator::class);

        $data = array_merge([
            'name'         => $name = $faker->word,
            'display_name' => studly_case($name),
            'description'  => $faker->sentence,
        ], $params);

        return dispatch(new CreateRoleJob($data['name'], $data['display_name'], $data['description']));

    }

    /**
     * Return All Roles
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
//    public function allRoles()
//    {
//        return Role::all();
//    }

}