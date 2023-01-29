<?php

namespace App\Form;

use App\Entity\Sound;
use App\Entity\Weapon;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\File;

class SoundType extends AbstractType
{
  /**
   * @param FormBuilderInterface $builder
   * @param array $options
   * @return void
   */
  public function buildForm(FormBuilderInterface $builder, array $options): void
  {
    $builder
      ->add('name', TextType::class)
      ->add('description', TextareaType::class, [
        'required' => false,
      ])
      ->add('file', FileType::class, [
        'mapped' => false,
        'required' => false,
        'constraints' => [
          new File([
            'maxSize' => '10M',
            'mimeTypes' => [
              'audio/x-wav',
              'audio/mpeg',
            ],
            'mimeTypesMessage' => 'Use x-wav or mpeg audio files',
          ])
        ],
      ])
      ->add('weapons', CollectionType::class, [
        'entry_type' => EntityType::class,
        'entry_options' => [
          'class' => Weapon::class,
          'choice_value' => 'id',
        ],
        'allow_add' => true,
        'allow_delete' => true,
        'by_reference' => false,
      ]);
  }

  /**
   * @param OptionsResolver $resolver
   * @return void
   */
  public function configureOptions(OptionsResolver $resolver): void
  {
    $resolver->setDefaults([
      'data_class' => Sound::class,
      'csrf_protection' => false,
    ]);
  }
}
