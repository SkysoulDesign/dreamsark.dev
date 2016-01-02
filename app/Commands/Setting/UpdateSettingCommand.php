<?php

namespace DreamsArk\Commands\Setting;

use DreamsArk\Commands\Command;
use DreamsArk\Repositories\Setting\SettingRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;

class UpdateSettingCommand extends Command implements SelfHandling
{
    /**
     * @var array
     */
    public $fields;

    /**
     * @var
     */
    public $setting_id;

    /**
     * Create a new command instance.
     *
     * @param $setting_id
     * @param array $fields
     */
    public function __construct($setting_id, array $fields)
    {
        $this->fields = $fields;
        $this->setting_id = $setting_id;
    }

    /**
     * Execute the command.
     *
     * @param SettingRepositoryInterface $repository
     */
    public function handle(SettingRepositoryInterface $repository)
    {
        $status = $repository->update($this->setting_id, $this->fields);

        if (!$status) {
            dd('Settings couldnt be updated');
        }

    }
}
