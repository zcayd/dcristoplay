
//========== REPRODUCTOR DE AUDIO  FIN ==============//






$( inicializar );

function inicializar( ) {
	var etiquetas = $( '.lista > .item > .categoria > .etiqueta' );
	etiquetas.each( function( ) {
		var etiqueta = $( this );
		var textoOriginal = etiqueta.text( );
		var textoActualizado = textoOriginal[ 0 ].toUpperCase( ) + textoOriginal.substring( 1, textoOriginal.length );
		etiqueta.text( textoActualizado );
	});
	var filtro = $( '.filtro' );
	filtro.on( 'keyup change', function( ) {
		var terminos = obtenerSimbolos( $( this ).val( ) );
		var items = $( '.lista > .item' );
		var cantidadDeCoincidencias = 0;
		items.each( function( ) {
			var item = $( this );
			var hayCoincidencia = false;
			for ( var i = 0; i < terminos.length && !hayCoincidencia; i++ ) {
				var termino = terminos[ i ];
				if ( contiene( item.text( ), termino ) || contiene( item.data( 'categoria' ), termino ) ) {
					hayCoincidencia = true;
					cantidadDeCoincidencias++;
				}
			}
			if ( hayCoincidencia ) {
				mostrarItem( item );
			}
			else {
				ocultarItem( item );
			}
		});
		actualizarCantidadDeCoincidencias( cantidadDeCoincidencias, existenTerminosDeBusqueda( terminos ) );
	});
}

function obtenerSimbolos( cadena ) {
	return cadena
		.trim( )
		.replace( /\s+/g, ' ' )
		.split( ' ' );
}

function descartarDiacriticos( cadena ) {
	return cadena
		.replace( /[áàäâ]/g, 'a' )
		.replace( /[éèëê]/g, 'e' )
		.replace( /[íìïî]/g, 'i' )
		.replace( /[óòöô]/g, 'o' )
		.replace( /[úùüû]/g, 'u' );
}

function contiene( pajar, aguja, opciones = { sensibleAMayusculas: false } ) {
	if ( pajar === undefined || aguja === undefined ) {
		return false;
	}
	if ( !opciones.sensibleAMayusculas ) {
		pajar = pajar.toLowerCase( );
		aguja = aguja.toLowerCase( );
	}
	pajar = descartarDiacriticos( pajar );
	aguja = descartarDiacriticos( aguja );
	return pajar.indexOf( aguja ) != -1;
}

function mostrarItem( item ) {
	item
		.stop( )
		.show( )
		.animate(
		{
			opacity: 1,
		},
		250
	);
}

function ocultarItem( item ) {
	item
		.stop( )
		.animate(
			{
				opacity: 0,
			},
			250,
			function( ) {
				item.hide( );
			}
		);
}

function actualizarCantidadDeCoincidencias( cantidadDeCoincidencias, existenTerminosDeBusqueda = true ) {
	var indicador = $( '.cantidad-de-coincidencias' );
	if ( existenTerminosDeBusqueda ) {
		switch( cantidadDeCoincidencias ) {
			case 0:
				var textoAMostrar = 'No se encontraron resultados';
				break;
			case 1:
				var textoAMostrar = 'Mostrando 1 resultado';
				break;
			default:
				var textoAMostrar = 'Mostrando ' + cantidadDeCoincidencias + ' resultados';
				break;
		}
		indicador.show( ).text( textoAMostrar );
	}
	else {
		indicador.hide( ).empty( );
	}
}

function existenTerminosDeBusqueda( terminos ) {
	return ( terminos.length > 1 || terminos[ 0 ] !== '' );
}































      const setup = () => {
        const getTheme = () => {
          if (window.localStorage.getItem('dark')) {
            return JSON.parse(window.localStorage.getItem('dark'))
          }

          return !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        }

        const setTheme = (value) => {
          window.localStorage.setItem('dark', value)
        }

        const getColor = () => {
          if (window.localStorage.getItem('color')) {
            return window.localStorage.getItem('color')
          }
          return 'lightblue'
        }

        const setColors = (color) => {
          const root = document.documentElement
          root.style.setProperty('--color-primary', `var(--color-${color})`)
          root.style.setProperty('--color-primary-50', `var(--color-${color}-50)`)
          root.style.setProperty('--color-primary-100', `var(--color-${color}-100)`)
          root.style.setProperty('--color-primary-light', `var(--color-${color}-light)`)
          root.style.setProperty('--color-primary-lighter', `var(--color-${color}-lighter)`)
          root.style.setProperty('--color-primary-dark', `var(--color-${color}-dark)`)
          root.style.setProperty('--color-primary-darker', `var(--color-${color}-darker)`)
          this.selectedColor = color
          window.localStorage.setItem('color', color)
          //
        }

        const updateBarChart = (on) => {
          const data = {
            data: randomData(),
            backgroundColor: 'rgb(207, 250, 254)',
          }
          if (on) {
            barChart.data.datasets.push(data)
            barChart.update()
          } else {
            barChart.data.datasets.splice(1)
            barChart.update()
          }
        }

        const updateDoughnutChart = (on) => {
          const data = random()
          const color = 'rgb(207, 250, 254)'
          if (on) {
            doughnutChart.data.labels.unshift('Seb')
            doughnutChart.data.datasets[0].data.unshift(data)
            doughnutChart.data.datasets[0].backgroundColor.unshift(color)
            doughnutChart.update()
          } else {
            doughnutChart.data.labels.splice(0, 1)
            doughnutChart.data.datasets[0].data.splice(0, 1)
            doughnutChart.data.datasets[0].backgroundColor.splice(0, 1)
            doughnutChart.update()
          }
        }

        const updateLineChart = () => {
          lineChart.data.datasets[0].data.reverse()
          lineChart.update()
        }

        return {
          loading: true,
          isDark: getTheme(),
          toggleTheme() {
            this.isDark = !this.isDark
            setTheme(this.isDark)
          },
          setLightTheme() {
            this.isDark = false
            setTheme(this.isDark)
          },
          setDarkTheme() {
            this.isDark = true
            setTheme(this.isDark)
          },
          color: getColor(),
          selectedColor: 'lightblue',
          setColors,
          toggleSidbarMenu() {
            this.isSidebarOpen = !this.isSidebarOpen
          },
          isSettingsPanelOpen: false,
          openSettingsPanel() {
            this.isSettingsPanelOpen = true
            this.$nextTick(() => {
              this.$refs.settingsPanel.focus()
            })
          },
          isNotificationsPanelOpen: false,
          openNotificationsPanel() {
            this.isNotificationsPanelOpen = true
            this.$nextTick(() => {
              this.$refs.notificationsPanel.focus()
            })
          },
          isSearchPanelOpen: false,
          openSearchPanel() {
            this.isSearchPanelOpen = true
            this.$nextTick(() => {
              this.$refs.searchInput.focus()
            })
          },
          isMobileSubMenuOpen: false,
          openMobileSubMenu() {
            this.isMobileSubMenuOpen = true
            this.$nextTick(() => {
              this.$refs.mobileSubMenu.focus()
            })
          },
          isMobileMainMenuOpen: false,
          openMobileMainMenu() {
            this.isMobileMainMenuOpen = true
            this.$nextTick(() => {
              this.$refs.mobileMainMenu.focus()
            })
          },
          isMobileMenuOpen: false,
          openMobileMenu() {
            this.isMobileMenuOpen = true
            this.$nextTick(() => {
              this.$refs.mobileMenu.focus()
            })
          },
          updateBarChart,
          updateDoughnutChart,
          updateLineChart,
        }
      }






































      $(document).ready(function(){

        $('.ir-arriba').click(function(){
          $('body, html').animate({
            scrollTop: '0px'
          }, 50);
        });
        $(window).scroll(function(){
          if( $(this).scrollTop() > 0 ){
            $('.ir-arriba').slideDown(50);
          } else {
            $('.ir-arriba').slideUp(50);
          }
        });
      });













      var myIndex = 0;
      carousel();
      
      function carousel() {
        var i;
        var x = document.getElementsByClassName("mySlides");
        for (i = 0; i < x.length; i++) {
          x[i].style.display = "none";  
        }
        myIndex++;
        if (myIndex > x.length) {myIndex = 1}    
        x[myIndex-1].style.display = "block";  
        setTimeout(carousel, 3000); // 1000 es un segundo
      }















