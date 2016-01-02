<?php

namespace DreamsArk\Commands\Translation;

use DreamsArk\Commands\Command;
use DreamsArk\Events\Translation\GroupsWasCreated;
use DreamsArk\Repositories\Translation\TranslationRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Support\Collection;

class ImportGroupsCommand extends Command implements SelfHandling
{

    use DispatchesJobs;

    /**
     * Create a new command instance.
     */
    public function __construct()
    {

    }

    /**
     * Execute the command.
     *
     * @param Filesystem $fileSystem
     * @param Application $app
     * @param TranslationRepositoryInterface $repository
     * @param Dispatcher $event
     * @return Collection of Group
     */
    public function handle(Filesystem $fileSystem, Application $app, TranslationRepositoryInterface $repository, Dispatcher $event)
    {
        $files = $fileSystem->allFiles($app->langPath());

        /**
         * Retrieves all local groups
         */
        $groups = collect($files)->transform(function ($file) {
            return pathinfo($file)['filename'];
        })->unique();

        /**
         * Save Database instance with all groups
         */
        $database = $repository->groups();

        /**
         * List Only names
         */
        $names = $database->pluck('name');

        /**
         * Create New Group for those which has been set locally
         * but was not present yet on the database
         */
        $newGroups = $groups->merge($names)->diff($names)->map(function ($name) {
            return $this->dispatch(new CreateGroupCommand($name));
        });


        /**
         * Announce GroupWasCreated
         */
        if (!$newGroups->isEmpty()) $event->fire(new GroupsWasCreated($newGroups));

        /**
         * Returns All groups
         */
        return $database->merge($newGroups);

    }
}
