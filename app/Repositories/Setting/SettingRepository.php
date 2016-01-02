<?php

namespace DreamsArk\Repositories\Setting;

use DreamsArk\Models\User\Setting;
use DreamsArk\Repositories\Repository;

class SettingRepository extends Repository implements SettingRepositoryInterface
{
    /**
     * @var Setting
     */
    public $model;

    /**
     * @param Setting $setting
     */
    function __construct(Setting $setting)
    {
        $this->model = $setting;
    }

    /**
     * Create a new setting with default values
     *
     * @param Int $user_id
     * @return Setting
     */
    public function createDefault($user_id)
    {
        $fields = collect(config('defaults.settings'))->merge(compact('user_id'));
        return $this->create($fields->toArray());
    }

}