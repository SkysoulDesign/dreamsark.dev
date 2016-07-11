<?php

namespace SkysoulDesign\Translation\Jobs;

use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Support\Collection;
use Illuminate\Translation\Translator;
use SkysoulDesign\Translation\Events\TranslationsWasCreated;
use SkysoulDesign\Translation\Models\Group;
use SkysoulDesign\Translation\Models\Language;
use SkysoulDesign\Translation\Repositories\TranslationRepositoryInterface;

/**
 * Class ImportTranslationJob
 *
 * @package SkysoulDesign\Translation\Jobs
 */
class ImportTranslationJob extends Job
{

    use DispatchesJobs;

    /**
     * Execute the command.
     *
     * @param Filesystem $fileSystem
     * @param Application $app
     * @param Translator $translator
     * @param TranslationRepositoryInterface $repository
     * @param Dispatcher $event
     */
    public function handle(Filesystem $fileSystem, Application $app, Translator $translator, TranslationRepositoryInterface $repository, Dispatcher $event)
    {

        $files = $fileSystem->allFiles($app->langPath());
        $loader = $translator->getLoader();

        /** @var Collection $groups */
        $groups = $this->dispatch(new ImportGroupsJob());

        /** @var Collection $languages */
        $languages = $this->dispatch(new ImportLanguagesJob());

        foreach ($files as $file) {

            /** @var Language $language */
            $language = $languages->where('name', $file->getRelativePath())->first();

            /** @var Group $group */
            $group = $groups->where('name', pathinfo($file)['filename'])->first();

            /** @var Collection $translations */
            $translations = collect($loader->load($language->name, $group->name));

            /**
             * Convert all arrays to to json
             */
            $translations->transform(function ($value) {
                return is_array($value) ? json_encode($value) : $value;
            });

            /**
             * Merge Translations on the database with local translations
             */
            $model = $repository->fetch($language->id, $group->id);
            $database = $model->pluck('value', 'key');

            /**
             * If translations is an array, process the JSON data and update it
             */
            $translations->each(function ($data, $key) use ($database, $model) {

                /**
                 * If it's not a json then there is nothing to update
                 */
                if ($model->isEmpty() or !$this->isJSON($data)) return;

                /**
                 * Retrieve Json
                 */
                $decoded = $database->map(function ($value) {
                    return json_decode($value, true);
                });

                $value = collect(json_decode($data, true))->merge($decoded->get($key))->toJson();

                /**
                 * Update Translation
                 */
                $updateCommand = new UpdateTranslationJob($model->where('key', $key)->first()->id, compact('value'));
                $this->dispatch($updateCommand);

            });

            /**
             * First get only new values that are not already on the DB
             * Then for each save new Translation on DB
             * Save Translations on database
             */
            $newItems = $translations->merge($database)->diffKeys($database)->map(function ($value, $key) use ($language, $group) {
                return $this->dispatch(new CreateTranslationJob($language->id, $group->id, compact('key', 'value')));
            });

            /**
             * Announce Translations was created
             */
            if (!$newItems->isEmpty()) $event->fire(new TranslationsWasCreated($newItems));

        }

    }

    /**
     * Helper to check if string is a json
     *
     * @param string $string
     * @return bool
     */
    public function isJSON($string)
    {
        return is_string($string) && is_object(json_decode($string)) && (json_last_error() == JSON_ERROR_NONE) ? true : false;
    }
}
