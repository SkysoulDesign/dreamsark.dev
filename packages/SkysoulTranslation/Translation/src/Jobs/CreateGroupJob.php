<?php

namespace SkysoulDesign\Translation\Jobs;

use SkysoulDesign\Translation\Repositories\TranslationRepositoryInterface;

/**
 * Class CreateGroupJob
 *
 * @package SkysoulDesign\Translation\Jobs
 */
class CreateGroupJob extends Job
{
    /**
     * @var
     */
    private $name;

    /**
     * Create a new command instance.
     *
     * @param $name
     */
    public function __construct($name)
    {
        $this->name = $name;
    }

    /**
     * Execute the command.
     *
     * @param \SkysoulDesign\Translation\Repositories\TranslationRepositoryInterface $repository
     * @return \SkysoulDesign\Translation\Models\Group
     */
    public function handle(TranslationRepositoryInterface $repository)
    {
        return $repository->createGroup($this->name);
    }

}
