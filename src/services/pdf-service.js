import pdfMake from 'pdfmake/build/pdfmake.js'
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js'
pdfMake.vfs = pdfFonts.pdfMake.vfs

export function getAnnotatingSheet ({
  groupName = '',
  students = []
}) {
  return pdfMake.createPdf({
    footer: function (currentPage, pageCount) {
      return {
        text: `${currentPage.toString()} / ${pageCount}`,
        style: 'footer'
      }
    },
    content: [
      { text: `Fiche d'émargement MIAGE`, style: 'title' },
      {
        stack: [
          { text: 'Groupe', style: 'infoTitle' },
          { text: groupName, italics: true }
        ],
        margin: [0, 0, 0, 20]
      },
      {
        stack: [
          { text: 'Professeur', style: 'infoTitle' },
          '_________________________________________'
        ],
        margin: [0, 0, 0, 30]
      },
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['*', 100, 100],
          body: students.reduce((all, { firstName, lastName, studentNumber }) => {
            all.push([
              {
                text: [ { text: `${lastName}\n`, bold: true }, firstName ],
                margin: [0, 5]
              },
              { text: studentNumber, alignment: 'center', italics: true, margin: [0, 5] },
              ''
            ])
            return all
          }, [[
            { text: `Nom de l'étudiant`, bold: true, fontSize: 14 },
            { text: 'Matricule', bold: true, alignment: 'center', fontSize: 14 },
            { text: 'Signature', bold: true, fontSize: 14 }
          ]])
        }
      }
    ],

    styles: {
      title: {
        bold: true,
        fontSize: 22,
        alignment: 'center',
        margin: [0, 0, 0, 30]
      },
      infoTitle: {
        bold: true,
        fontSize: 15,
        margin: [0, 0, 0, 5]
      },
      infoValue: {
        italic: true
      },
      footer: {
        bold: true,
        alignment: 'center'
      }
    }
  })
}

export function getAlgorithmExport ({
  id = '',
  schoolYearLabel = '',
  semester = '',
  students = []
}) {
  return pdfMake.createPdf({
    footer: function (currentPage, pageCount) {
      return {
        text: `${currentPage.toString()} / ${pageCount}`,
        style: 'footer'
      }
    },
    content: [
      { text: `Export des résultats de choix d'UE`, style: 'title' },
      {
        stack: [
          { text: 'Année', style: 'infoTitle' },
          { text: `${schoolYearLabel} (${semester === 'SEMESTER_1' ? 'Premier semestre' : 'Second semestre'})`, italics: true }
        ],
        margin: [0, 0, 0, 20]
      },
      {
        stack: [
          { text: 'Identifiant de version', style: 'infoTitle' },
          id
        ],
        margin: [0, 0, 0, 30]
      },
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['*', '*'],
          body: students.reduce((all, { firstName, lastName, studentNumber, choices }) => {
            all.push([
              {
                text: [
                  { text: `${lastName} ${firstName}\n`, bold: true },
                  { text: studentNumber, italics: true }
                ],
                margin: [0, 5]
              },
              {
                text: choices.map(choice => ({
                  text: `- ${choice.label}, ${choice.apogeeCode} (${choice.rank})\n`
                }))
              }
            ])
            return all
          }, [[
            { text: `Etudiant`, bold: true, fontSize: 14 },
            { text: 'Choix', bold: true, fontSize: 14 }
          ]])
        }
      }
    ],

    styles: {
      title: {
        bold: true,
        fontSize: 22,
        alignment: 'center',
        margin: [0, 0, 0, 30]
      },
      infoTitle: {
        bold: true,
        fontSize: 15,
        margin: [0, 0, 0, 5]
      },
      infoValue: {
        italic: true
      },
      footer: {
        bold: true,
        alignment: 'center'
      }
    }
  })
}
