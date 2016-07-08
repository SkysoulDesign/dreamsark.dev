<?php

namespace SkysoulDesign\Translation\Jobs;

use Illuminate\Foundation\Bus\DispatchesJobs;
use SkysoulDesign\Translation\Repositories\TranslationRepositoryInterface;

class SyncTranslationJob extends Job
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
*@param \SkysoulDesign\Translation\Repositories\TranslationRepositoryInterface $repository
     */
    public function handle(TranslationRepositoryInterface $repository)
    {

        /**
         * Retrieve all languages for further usage
         */
        $allLanguages = $repository->languages();

        /**
         * Get All Groups
         */
        $groups = $repository->groups()->load('translations', 'translations.language');

        /**
         * For Each Group Execute Operation
         */
        $groups->map(function ($group) use ($allLanguages) {

            /**
             * Get All Languages Contained within this Group
             */
            $languages = $group->translations->groupBy('language.id');

            /**
             * Check if all languages are contained within $languages, otherwise append it
             * with an empty collection so it will generate all keys, values for this language
             * as it means the language does not have any translation at the moment
             */
            $missingLanguages = collect($allLanguages->keyBy('id')->keys())->diff($languages->keys());
            $missingLanguages->each(function ($language) use ($languages) {
                $languages->put($language, collect());
            });

            /**
             * Merge All Values in order to get uniques
             */
            $merged = $languages->map(function ($translations) {
                return $translations->pluck('key');
            })->collapse();

            /**
             * Now for each language extract the merged groups in order to get new keys
             */
            $languages->each(function ($translations, $language) use ($merged, $group) {

                $newValues = collect($merged)->diff($translations->pluck('key'));

                /**
                 * For each new Value, Create a new Translation
                 */
                $newValues->each(function ($key) use ($language, $group) {
                    $this->dispatch(new CreateTranslationJob($language, $group->id, compact('key')));
                });

            });

        });

    }
}
