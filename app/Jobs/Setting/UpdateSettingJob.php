<?php

namespace DreamsArk\Jobs\Setting;

use DreamsArk\Jobs\Job;
use DreamsArk\Models\User\Setting;
use DreamsArk\Repositories\Setting\SettingRepositoryInterface;

/**
 * Class UpdateSettingJob
 *
 * @package DreamsArk\Jobs\Setting
 */
class UpdateSettingJob extends Job
{
    /**
     * @var array
     */
    public $fields;

    /**
     * @var Setting|int
     */
    public $setting;

    /**
     * Create a new command instance.
     *
     * @param Setting|int $setting
     * @param array $fields
     */
    public function __construct($setting, array $fields)
    {
        $this->fields = $fields;
        $this->setting = $setting;
    }

    /**
     * Execute the command.
     *
     * @param SettingRepositoryInterface $repository
     * @return bool
     */
    public function handle(SettingRepositoryInterface $repository)
    {
        return $repository->update($this->setting, $this->fields);
    }

}
