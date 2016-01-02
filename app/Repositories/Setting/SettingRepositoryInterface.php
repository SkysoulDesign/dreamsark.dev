<?php

namespace DreamsArk\Repositories\Setting;

use DreamsArk\Models\User\Setting;

interface SettingRepositoryInterface
{
    /**
     * Create a new Setting on the Database
     *
     * @param array $fields
     * @return Setting
     */
    public function create(array $fields);

    /**
     * Create a new setting with default values
     *
     * @param Int $user_id
     * @return Setting
     */
    public function createDefault($user_id);

    /**
     * Update Settings
     *
     * @param Int $setting_id
     * @param array $fields
     * @return bool
     */
    public function update($setting_id, array $fields);

}