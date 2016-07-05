<?php
/**
 * Translation Controller
 */
use SkysoulDesign\I18n\Http\Controllers\TranslationController;

$app->group(['prefix' => 'translation', 'as' => 'translation.'], function () use ($app) {
    $app->get('import', TranslationController::class . '@import')->name('import');
    $app->get('export', TranslationController::class . '@export')->name('export');
    $app->get('sync', TranslationController::class . '@sync')->name('sync');
    $app->post('language/store', TranslationController::class . '@newLanguage')->name('newLanguage');
    $app->post('group/store', TranslationController::class . '@newGroup')->name('newGroup');
    $app->post('translation/store', TranslationController::class . '@newTranslation')->name('newTranslation');
    $app->post('update/{translation}', TranslationController::class . '@update')->name('update');
});

$app->get('translation/{language?}/{group?}', TranslationController::class . '@index')->name('translation');